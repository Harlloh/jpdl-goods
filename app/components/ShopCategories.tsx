"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Import Swiper styles

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import getShopCategories from "@/hooks/getShopCategories";
import { useEffect, useState } from "react";

// interface ShopCategory {
//   id: number;
//   name: string;
//   image: string;
// }

// interface ShopCategoriesProps {
//   categories: ShopCategory[];
// }

const ShopCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getShopCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col items-center gap-5 py-5">
      <h1 className="text-3xl font-semibold underline">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <Swiper
          // install Swiper modules

          spaceBetween={1}
          slidesPerView={4}
          // navigation
          loop={true} // Enable infinite loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // scrollbar={{ draggable: true }}

          modules={[Autoplay, Navigation, A11y, Scrollbar]}
          style={{ height: "fit-content" }}
        >
          {categories.map((category: any) => {
            return (
              <SwiperSlide
                key={category.id}
                onClick={() => router.push(category.name)}
              >
                <div>
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ShopCategories;
