import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const roundToHalf = (value) => Math.round(value * 2) /2;

const StarRating = ({ rating, max = 5, starClassName, divClassName }) => {
  const stars = [];
  const rounded = roundToHalf(rating);

  if(rating == 0){
    for(let i =1; i<=max; i++){
      stars.push(<FaRegStar key={i} className={starClassName} />);
    }
  }else{

    for (let i = 1; i <= max; i++) {
      if (i <= Math.floor(rounded)) {
        // Full star
        stars.push(<FaStar key={i} className={starClassName} />);
      } else if (i === Math.ceil(rounded) && rating % 1 !== 0) {
        // Half star
        stars.push(<FaStarHalfAlt key={i} className={starClassName} />);
      }
    }
  }
  return <div className={divClassName}>{stars}</div>;
};

export default StarRating;