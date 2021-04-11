import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
//import fontawesome icons//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
//import order confirmation image//
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);
  // by default order isn't placed = false//
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  // event handler upon placing the order ///////////////////////
  const handleProceedCheckout = () => {
    // upon clicking the btn "checkout", it will go to shipment page
    history.push("/shipment");
  };

  //event handler to remove an item from the cart in overview section
  const handleRemoveProduct = (productKey) => {
    // filtering the matched one and then removing it by !== //
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    // finally remove from the local storage////
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    // cart --- to take data from localStorage and then put the quantity into the object//
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    //map through each key and then find every other keys to put inside an extra --
    //-- object property named "quantity"
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key]; // creating a new obj property "quantity" and then adding that property into product//
      return product;
    });
    setCart(cartProducts);
    console.log(cartProducts);
  }, []);
  // condition for showing the confirmation image////////////////
  let thankyouImg;
  if (orderPlaced) {
    thankyouImg = <img src={happyImage} alt="" />;
  }
  ////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            handleRemoveProduct={handleRemoveProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem> // for review item showing //////////////////////////////////////////////////////////////////
          // see "ReviewItem" component for details////
        ))}
        {/* // show img upon order confirmation in the product component// */}
        {thankyouImg}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-btn">
            <FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />
            Proceed to Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
