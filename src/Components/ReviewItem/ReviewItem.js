import React from "react";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const { name, price, seller, quantity, key } = props.product;
  return (
    <div className="flex-container">
      <div className="review-item-container">
        <p className="product-name">{name}</p>
        <p>
          <small className="price-name">${price}</small>
        </p>
        <p>
          Sold by : <small>{seller}</small>{" "}
        </p>
        <p>Quantity : {quantity}</p>
        <br />
        <button
          onClick={() => props.handleRemoveProduct(key)}
          className="main-btn"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
