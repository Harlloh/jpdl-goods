"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ShopCategory {
  id: number;
  name: string;
  image: string;
}

interface ShopCategoriesProps {
  categories: ShopCategory[];
}

const ShopCategories: React.FC<ShopCategoriesProps> = ({ categories }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-5 py-5">
      <h1 className="text-3xl font-semibold underline">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {categories.map((category) => {
          return (
            <div key={category.id} onClick={() => router.push(category.name)}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {/* <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="w-full"
                /> */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-nowrap">
                    {category.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategories;
