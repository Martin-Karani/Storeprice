import React, { useState } from "react";
import { ViewRating } from "./Rating";

function MemberReviews() {
  return (
    <div className="same-phone-reviews">
      <p className="category-name__desc">
        What People with Samsung S9 plus have to say
      </p>
      <div className="review-wrapper">
        <ViewRating />
        <div className="review-content">
          I love this Device, the display and i'm in love with the camera
        </div>
        <div className="review-origin flex-row justify-space-btwn">
          <p>
            <i>Commented from</i> Samsung S9
          </p>
          <i>5 months ago</i>
        </div>
      </div>
    </div>
  );
}
function ExpertsReviews() {
  return (
    <div className="expert-reviews ">
      <p className="category-name__desc">
        Lets see what the experts had to say about Samsung S9+
      </p>

      <div className="expert-review-card">
        <ViewRating />
        <h4 className="expert-review-title">Samsung S9+ </h4>
        <p className="review-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          voluptatibus, ipsa deleniti laudantium enim a facilis hic maiores id
          officia.
        </p>
        <p className="review-author">Aouro Brown . 5 months ago</p>
        <a href="/grgj/msgo/fnaof" className="expert-review-source">
          Read more at T3
        </a>
      </div>
    </div>
  );
}

function Review() {
  const [defaultReview, setDefaultReview] = useState(true);
  return (
    <div>
      <h3 className="category-name">Reviews</h3>
      <div>
        <div className=" flex-row reviews-category">
          <button
            className={
              defaultReview ? "reviews-people active" : "reviews-people"
            }
            onClick={() => setDefaultReview(true)}
          >
            People With Same Phone
          </button>
          <button
            className={
              defaultReview ? "reviews-experts" : "reviews-people active"
            }
            onClick={() => setDefaultReview(false)}
          >
            Experts Reviews
          </button>
        </div>
        <hr />
        <div className="reviews">
          {defaultReview ? <MemberReviews /> : <ExpertsReviews />}
        </div>
      </div>
    </div>
  );
}

export default Review;
