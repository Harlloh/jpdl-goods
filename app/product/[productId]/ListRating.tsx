"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import Image from "next/image";

interface RatingProps {
  product: any;
}

const ListRating: React.FC<RatingProps> = ({ product }) => {
  return (
    <div className="mt-5">
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className="max-w-[300px] ">
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <Avatar src={review.user.image} />
                  </div>
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.starCount} readOnly />
                  <div className="ml-2">{review.body}</div>
                  <hr className="mb-4 mt-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
