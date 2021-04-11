import React from "react";
import { useParams } from "react-router";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productKey } = useParams(); // using parameter from route //
  const product = fakeData.find((pd) => pd.key === productKey);
  //   console.log(product);
  return (
    <div>
      <h1>Every {productKey} has it's own detail</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
