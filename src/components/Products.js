/** @format */

import React, { useEffect, useState } from "react";
import { Button, Modal, Card } from "antd";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      console.log("products", res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div style={{ display: "grid" }}>
      <h1>Products List</h1>
      {products.map((product) => (
        <Card
          hoverable
          style={{
            width: 300,
            margin: "10px",
          }}
          cover={
            <img
              alt='avatar'
              src={product.image}
              style={{
                objectFit: "scale-down",
                height: "10%",
                width: "30%",
                padding: "10px",
              }}
            />
          }>
          <h2>{product.title}</h2>
          <h3>Price: {product.price}</h3>
        </Card>
      ))}
    </div>
  );
};
export default Products;
