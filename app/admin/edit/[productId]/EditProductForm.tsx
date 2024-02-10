"use client";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Inputs from "@/app/components/inputs/inputs";
import { Categories } from "@/app/utils/Categories";
import { Colors } from "@/app/utils/Color";
import firebaseApp from "@/libs/firebase";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setConstantValue } from "typescript";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAddCategory from "@/hooks/useCreateCategory";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useCart } from "@/hooks/useCartHook";
import NullData from "@/app/components/NullData";
import useGetShopCategories from "@/hooks/usegetShopCategories";
import { BASE_URL, getIsAdmin, getToken } from "@/api/auth/apis";

// ... (existing imports)
export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

interface EditProductFormProps {
  product: any;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [selectedImages, setSelectedImages] = useState<ImageType[]>([]);
  const {
    isAddingCategory,
    error,
    addCategory,
    startAddingCategory,
    stopAddingCategory,
  } = useAddCategory();
  const [isLoading, setIsLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();
  const storedisAdmin = getIsAdmin();
  const isAdmin = storedisAdmin ? atob(storedisAdmin) : null;
  const userToken = getToken();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      images: product.images,
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.price = parseFloat(data.price as string);

    //upload images to firebase

    //save product to mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image");
    }

    const handleImageUpload = async () => {
      toast("Updating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                },
                (error) => {
                  console.log("error uploading image");
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the downloadable URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image upload");
      }
    };

    await handleImageUpload();
    const productData = { ...data, images: uploadedImages };

    // Use PUT request for updating an existing product
    axios
      .put(`${BASE_URL}/product/update/${product.id}`, productData, {
        headers: {
          Authorization: userToken,
        },
      })
      .then(() => {
        toast.success("Product Updated successfully");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to update product");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      const updatedImages = [...prev, value];
      setSelectedImages(updatedImages);
      return updatedImages;
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        setSelectedImages(filteredImages);
        return filteredImages.length > 0 ? filteredImages : null;
      }
      return prev;
    });
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCategory(newCategory);
    await fetchCategories();
    setNewCategory("");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    try {
      // Fetch categories if needed
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const { categories } = useGetShopCategories();
  if (!isAdmin) {
    return <NullData title="Oops access denied" />;
  }

  return (
    <>
      <Heading title="Edit Product" center />
      <Inputs
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Inputs
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Inputs
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="text"
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This Product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-cols md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          <select
            {...register("category")}
            className="w-full p-2 border rounded"
          >
            {categories.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {/* Button to add a new category */}
        <button
          className="flex mt-3 p-2 text-sm text-white bg-teal-900 rounded hover:bg-green-600"
          onClick={startAddingCategory}
        >
          <AiOutlinePlusCircle size={20} />
          Add New Category
        </button>
        {isAddingCategory && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-white p-4 rounded shadow-md">
              <form onSubmit={handleCreateCategory}>
                <label htmlFor="newCategory">New Category:</label>
                <input
                  type="text"
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  name="newCategory"
                  required
                  className="border rounded p-1"
                />
                <button
                  type="submit"
                  className="bg-teal-800 text-white rounded p-2 ml-2"
                >
                  Add Category
                </button>
              </form>
              <button
                onClick={stopAddingCategory}
                className="text-white-600 hover:text-white-800 border p-2 bg-orange-700 text-white"
              >
                Cancel
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex flex-wrap gap-4">
        <div className="font-bold">
          Select the available product colors and upload their images
        </div>
        <div className="text-sm">
          You must upload an image for each of the color selected otherwise your
          color selection will be ignored.
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Colors.map((item, index) => (
            <SelectColor
              key={index}
              item={item}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          ))}
          {selectedImages && selectedImages.length > 0 && (
            <div className="mb-4">
              <div className="font-bold mb-2">Selected Images Preview:</div>
              <div className="flex gap-2">
                {selectedImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image.image as Blob)}
                    alt={image.color}
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        lable={isLoading ? "Loading..." : "Update Product"}
        handleClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default EditProductForm;
