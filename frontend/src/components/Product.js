import React from "react";
import { Card, Dropdown } from "react-bootstrap";
import { SEED } from "../env";
import ProductCardRating from "./ProductCardRating";
import { Link } from "react-router-dom";
import "../index.css";


// Product({ product }) -> Accessing products directly without using props
function Product({ product}) {

  return (
    <Link to={`/product/${product._id}`}>
      <Card className="product-card">
        <div className="product-img-container">
          {/* <img src={require('../images/miao-xiang-leFR7Fj3J6I-unsplash.jpg')} /> */}
          <Card.Img src={`${SEED}${product.image}`} />
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-title">
            <p className="painting-title">{product.name}</p>
            {/* <p className="painting-title">Emrald Earrings</p> */}
          </div>

          <div className="product-desc">
            <div className="product-rating-container">
              <ProductCardRating
                value={product.rating}
                text={`${product.numReviews}`}
                color={"#f8e826"}
              />
            </div>

            <div className="product-price-container">
              <p className="price">Rs. {product.price}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
 

export default Product;
