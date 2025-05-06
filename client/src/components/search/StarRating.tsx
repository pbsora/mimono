import { Star } from "lucide-react";
import { convertPopularityToStars } from "../../utils/helpers";

interface StarRatingProps {
  popularity: number;
}

const StarRating = ({ popularity }: StarRatingProps) => {
  const starCount = convertPopularityToStars(popularity);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < starCount
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
