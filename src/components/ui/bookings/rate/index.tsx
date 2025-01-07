/** @format */

import { errorHandler } from "@/_shared/constants";
import { Label } from "@/components/_shared/label";
import { LoadingButton } from "@/components/_shared/loading-button";
import { Textarea } from "@/components/_shared/textarea";
import { useToast } from "@/components/_shared/toast/use-toast";
import { useCreateRatingMutation } from "@/redux/services/booking";
import { Star } from "lucide-react";
import React, { useState } from "react";

const Rating = ({
  onClose,
  handleClickModalSuccessRate,
  bookingId,
}: {
  onClose: () => void;
  handleClickModalSuccessRate: () => void;
  bookingId: number;
}) => {
  const { toast } = useToast();
  const [createRating, { isLoading }] = useCreateRatingMutation();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async () => {
    const payload = {
      rating,
      review,
      booking_id: bookingId,
    };

    try {
      await createRating(payload).unwrap();
      toast({
        variant: "default",
        title: "Rating Submitted",
        description: "Your rating has been submitted successfully.",
      });
      handleClickModalSuccessRate();
    } catch (err: any) {
      errorHandler(err as any);
    }
  };

  return (
    <div className="p-4">
      <p className="text-sm">Rate your Stay</p>

      <section className="flex gap-3 items-center mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} onClick={() => handleStarClick(star)}>
            <Star
              className={`cursor-pointer ${
                rating >= star ? "text-primary/70" : "text-gray-300"
              }`}
            />
          </div>
        ))}
      </section>

      <section className="mt-6">
        <Label className="text-xs font-normal">
          Describe your experience (optional)
        </Label>
        <Textarea
          className="mt-2 resize-none h-40"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </section>

      <LoadingButton
        className="w-full mt-16"
        onClick={handleSubmit}
        loading={isLoading}
        disabled={isLoading || rating === 0}
      >
        Submit
      </LoadingButton>
    </div>
  );
};

export default Rating;
