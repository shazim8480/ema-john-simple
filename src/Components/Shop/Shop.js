import React, { useEffect, useState } from "react";
import "./Shop.css";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";
//import fontawesome icons//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  // useEffect for showing the cart items when go back from review to shop page///
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey]; // LINE 19-23 = adding a property named "quantity" from the previous database in rhe product array//
      return product;
    });
    setCart(previousCart);
  }, []);

  // button click handler //
  const handleAddProduct = (product) => {
    // console.log(product);
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      // if the matching product(by key) is found, then if block executes === > means, product quantity is calculated/////////
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      // filtering out others who aren't matched by the same product//
      const others = cart.filter((pd) => pd.key !== product.key);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1; // by default for unselected products////////////
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            key={pd.key} // unique key declaration for easier react rendering //
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd} // this pd is used for array method purposes for every product ---- look for "pd" and you'll be able to clear all confusions//
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button
              style={{ marginLeft: "6%" }}
              // onClick={() => props.handleAddProduct(props.product)}
              className="main-btn"
            >
              <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
              Review Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
