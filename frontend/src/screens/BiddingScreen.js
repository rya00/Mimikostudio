// useState and useEffect used for connecting to backend
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BiddingProduct from "../components/Bidding";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listBiddings } from "../actions/biddingActions";
import useUser from "../helper/useUser";

/* <Message>{error}</Message> -> Error is passed as child in the component */

function BiddingScreen() {
  const location = useLocation();

  const dispatch = useDispatch();
  const biddingList = useSelector((state) => state.biddingList);
  // Destructuring biddingListReducer
  const { error, loading, bidding_products, page, pages } = biddingList;

  let keyword = location.search;

  // useEffect ->  Triggered every single time the component loads or when a state value gets updated
  // In our app it gets triggered when the component first loads
  // Empty array kept because we only want this to update when the component loads not when an actual state element gets updated
  useEffect(() => {
    dispatch(listBiddings(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h1 className="auto-underline-animation">Bidding Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row className="painting-container">
            {bidding_products.map((bidding_product) => (
              // Key attribute is needed to map for looping in react
              <Col key={bidding_product._id} sm={12} md={6} lg={4} xl={3} className="rng-container">
                <BiddingProduct bidding_product={bidding_product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default BiddingScreen;
