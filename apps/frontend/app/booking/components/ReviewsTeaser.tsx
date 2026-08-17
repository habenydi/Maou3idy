
import Img from "next/image";
import { Review } from "@/types";

type ReviewsTeaserProps = {
  reviews: Review[];
};

export default function ReviewsTeaser({
  reviews,
}: ReviewsTeaserProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-surface-container-low p-6 rounded-3xl">
        No reviews yet
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low p-6 rounded-3xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {reviews.slice(0, 4).map((review) => (
            <Img
              key={review.name}
              src={review.image}
              alt={review.name}
              loading="eager"
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
          ))}
        </div>

        <div>
          <div className="font-bold">
            {reviews.length} reviews
          </div>
          <div className="text-sm text-on-surface-variant">
            See what patients are saying
          </div>
        </div>
      </div>

      <button className="text-primary font-semibold">
        View all
      </button>
    </div>
  );
}