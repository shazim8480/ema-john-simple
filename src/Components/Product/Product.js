import React from "react";
import "./Product.css";
//import fontAwesome icons//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  //   console.log(props);
  const { img, name, seller, price, stock, key } = props.product;

  return (
    <div className="product-inner">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>
          <small>by : </small>
          {seller}
        </p>
        <br />
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - order soon</small>
        </p>
        {props.showAddToCart && (
          <button
            onClick={() => props.handleAddProduct(props.product)}
            className="main-btn"
          >
            <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
