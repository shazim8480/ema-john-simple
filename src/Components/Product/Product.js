import React from "react";
import "./Product.css";
//import fontawesome icons//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  //   console.log(props);
  const { img, name, seller, price, stock } = props.product;

  return (
    <div className="product-inner">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p>
          <small>by : </small>
          {seller}
        </p>
        <br />
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - order soon</small>
        </p>
        <button
          onClick={() => props.handleAddProduct(props.product)}
          className="main-btn"
        >
          <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
