import React from "react";

const Cart = (props) => {
  const cart = props.cart;

  // function for total price (without other charges) calculation//
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }

  // function for precise calculation //
  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };
  // //////////////////////////////////////////////////////////// //

  // Shipping & Handling calculation//

  let shipping = 0;
  if (total > 100) {
    shipping = 0;
  } else if (total > 50) {
    shipping = 22.99;
  } else if (total > 35) {
    shipping = 10.99;
  } else if (total > 0) {
    shipping = 4.99;
  } else if (total > 15) {
    shipping = 8.99;
  }

  // TAX Calculation //
  let tax = total / 10;

  // Grand Total //
  const grandTotal = total + shipping + tax;

  return (
    <div className="cart-container">
      <h3>Order Summary</h3>
      <h4>Items Ordered : {cart.length}</h4>
      <p>
        <small>Shipping & Handling : {formatNumber(shipping)} </small>
      </p>
      <p>
        {" "}
        <small>Total Before Tax : {formatNumber(total)}</small>{" "}
      </p>
      <p>
        <small>Estimated Tax : {formatNumber(tax)}</small>
      </p>
      <h3>Order Total : {formatNumber(grandTotal)}</h3>
    </div>
  );
};

export default Cart;
