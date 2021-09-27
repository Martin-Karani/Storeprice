import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_STORE_REVIEW } from "../graphql/Mutations";
import useForm from "../useForm";
import { ReactComponent as Star } from "../public/star.svg";

// import { CreateRating } from "./Rating";

const AddStoreReview = ({ toggleAddStoreReview, storeId }) => {
  const { handleChange, handleSubmit, input } = useForm(
    addStoreReviewCallback,
    {
      review: "",
    }
  );
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    return ratingValue;
  };
  const [addStoreReview, { loading: addStoreReviewLoading }] = useMutation(
    ADD_STORE_REVIEW,
    {
      onError(err) {
        console.log(err);
      },
      variables: { review: input.review, rating: rating, storeId: storeId },
    }
  );
  function addStoreReviewCallback() {
    addStoreReview();
  }
  if (addStoreReviewLoading) return "loading";

  return (
    <>
      <div className="review-form">
        <button className="close" onClick={() => toggleAddStoreReview(false)}>
          &times;
        </button>
        <h3 className="category-name">Review Makuti Store</h3>
        <div className="star-rating">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                Score
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleClick(ratingValue)}
                />
                <Star
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  className="review-star"
                  style={
                    ratingValue <= (hover || rating)
                      ? { fill: "#ffc107" }
                      : { fill: "#e4e5e9" }
                  }
                />
              </label>
            );
          })}
        </div>

        <label>Describe what you think about the Retailer</label>
        <textarea
          name="review"
          id=""
          cols="30"
          rows="10"
          value={input.review}
          onChange={handleChange}
          placeholder="not less than 5 characters"
        ></textarea>
        <div className="flex1">
          <button className="post-btn" onClick={handleSubmit}>
            Post
          </button>
          <button
            className="cancel-btn"
            onClick={() => toggleAddStoreReview(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className="overlay"
        onClick={() => toggleAddStoreReview(false)}
      ></div>
    </>
  );
};

export default AddStoreReview;
