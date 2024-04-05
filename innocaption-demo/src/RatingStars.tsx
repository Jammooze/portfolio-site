import React from "react";

function getRatingStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars > 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i
        key={i}
        className="bi bi-star-fill"
      ></i>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <i
        key="half"
        className="bi bi-star-half"
      ></i>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i
        key={`empty${i}`}
        className="bi bi-star"
      ></i>
    );
  }

  return stars;
}

interface RatingStarsProps {
  rating: number;
}

function RatingStars({ rating }: RatingStarsProps) {
  return <div className="ratingStars">{getRatingStars(rating)}</div>;
}

export default RatingStars;