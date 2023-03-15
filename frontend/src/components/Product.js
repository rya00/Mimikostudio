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
        

        <Card.Body>
            <Card.Title as="div">
              <strong className="painting-title">{product.name}</strong>
            </Card.Title>
          

          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e826"}
              />
            </div>
          </Card.Text>

          <Card.Text as="h3">Rs. {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
