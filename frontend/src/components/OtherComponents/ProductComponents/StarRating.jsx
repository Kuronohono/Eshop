import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      // Full star
      stars.push(<FaStar key={i} className="star_rate" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      // Half star
      stars.push(<FaStarHalfAlt key={i} className="star_rate" />);
    }
  }

  return <div className="flex items-center gap-[2px]">{stars}</div>;
};

export default StarRating;