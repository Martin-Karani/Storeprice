import React from "react";
import { ReactComponent as Rate } from "../public/star.svg";
const RATING = 4;

export function ViewRating() {
  return (
    <div className="flex-row">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <Rate
            className="star"
            key={i}
            style={
              ratingValue <= RATING ? { fill: "#ffc107" } : { fill: "#e4e5e9" }
            }
          />
        );
      })}
      ,
    </div>
  );
}
