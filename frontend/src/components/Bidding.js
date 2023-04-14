import React from "react";
import { Card } from "react-bootstrap";
import { SEED } from "../env";
import { Link } from "react-router-dom";

// Product({ product }) -> Accessing products directly without using props
function BiddingProduct({ bidding_product }) {
  return (
    <Link to={`/bidding/${bidding_product._id}`}>
      <Card className="product-card">
        <div className="product-img-container">
          <Card.Img src={`${SEED}${bidding_product.image}`} />
        </div>

        <Card.Body className="product-card-body">
          <div className="product-card-title">
            <p className="painting-title">{bidding_product.bidding_name}</p>
          </div>

          <div>
            {/* <strong>Highest Bidder: {bidding_product.highest_bidder}</strong> */}
            <strong>Highest Bidder: Riya</strong>
          </div>

          <div>
            <strong>Highest Bid: {bidding_product.current_price}</strong>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default BiddingProduct;
