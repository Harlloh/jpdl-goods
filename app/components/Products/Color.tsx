"use client";
import {
  cartProductType,
  selectedImg,
} from "@/app/product/[productId]/ProductDetails";
import React from "react";

interface SetColorPropsType {
  images: selectedImg[];
  cartProduct: cartProductType;
  handleColorSelect: (value: selectedImg) => void;
}

const SetColor: React.FC<SetColorPropsType> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center ">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => handleColorSelect(image)}
                className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
                  cartProduct.selectedImage.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                }`}
              >
                <div
                  style={{ background: image.colorCode }}
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
