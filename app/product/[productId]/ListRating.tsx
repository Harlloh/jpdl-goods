"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface RatingProps {
  product: any;
}

const ListRating: React.FC<RatingProps> = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews
    ? product?.reviews
    : product?.reviews?.slice(0, 3);
  const router = useRouter();

  if (showAllReviews) {
    router.push(`/product/${product.id}/reviews`);
  }
  return (
    <div className="mt-5">
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {visibleReviews &&
          visibleReviews.map((review: any) => {
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
        {!showAllReviews && (
          <button
            className="text-orange-800 cursor-pointer felx items-center"
            onClick={() => setShowAllReviews(true)}
          >
            show all reviews <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListRating;
