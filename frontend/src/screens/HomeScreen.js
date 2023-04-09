// useState and useEffect used for connecting to backend
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import DisplayCarousel from "../components/DisplayCarousel";
import useUser from "../helper/useUser";
import { Container } from "react-bootstrap";
import AboutArtist from "../components/AboutArtist"

/* <Message>{error}</Message> -> Error is passed as child in the component */

function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // Destructuring productListReducer
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  const [sort, setSort] = useState('');

  // useEffect ->  Triggered every single time the component loads or when a state value gets updated
  // In our app it gets triggered when the component first loads
  // Empty array kept because we only want this to update when the component loads not when an actual state element gets updated
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  console.log(products);

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    let newKeyword = '';
    if (keyword && keyword.includes('keyword=')) {
      // Keyword is already present, so just update the sort parameter
      newKeyword = `${keyword}&sort=${selectedSort}`;
    } else {
      // Keyword is not present, so set the sort parameter with a leading "?"
      newKeyword = `?sort=${selectedSort}`;
    }
    dispatch(listProducts(newKeyword));
  };
  
  return (
    <div>
      {/* {!keyword && <ProductCarousel />} */}
      <DisplayCarousel />

      <Container>
        <h1 className="auto-underline-animation">Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Row className="painting-container">
              {products.map((product) => (
                // Key attribute is needed to map for looping in react
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="rng-container">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        )}
      </Container>

      <AboutArtist />
    </div>
  );
}

export default HomeScreen;
