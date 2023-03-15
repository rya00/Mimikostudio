import React from "react";
import { Card } from "react-bootstrap";
import { SEED } from "../env";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import "../index.css";

// Product({ product }) -> Accessing products directly without using props
function Product({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="product-card">
        <Card.Img src={`${SEED}${product.image}`} />

        <Card.Body className="product-card-body">
          <div className="product-card-title">
            <label className="product-card-label">Title: </label>
            <p className="painting-title">{product.name}</p>
          </div>

          <Card.Text as="div">
            <div className="product-review-container">
              <label className="product-card-label">Reviews: </label>
              <Rating
                value={product.rating}
                text={`${product.numReviews}`}
                color={"#f8e826"}
              />
            </div>
          </Card.Text>

          <div className="product-price-container">
            <label className="product-card-label">Price: </label>
            <p className="price">Rs. {product.price}</p>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
