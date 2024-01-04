"use client";
import Image from "next/image";
import {
  cartProductType,
  selectedImg,
} from "../../product/[productId]/ProductDetails";
interface ProductImageProps {
  cartProduct: cartProductType;
  product: any;
  handleColorSelect: (value: selectedImg) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((image: selectedImg) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative w-[80%] apect-square rounded border-teal-300 h-full ${
                cartProduct.selectedImage.color === image.color
                  ? "border-[1.5px]"
                  : "border-[none]"
              }`}
            >
              <Image
                src={image.image}
                fill
                alt={image.color}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 aspect-square relative">
        <Image
          src={cartProduct.selectedImage.image}
          alt={cartProduct.name}
          fill
          className="w-full h-full object-contain  max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
