// useState and useEffect used for connecting to backend
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'

/* <Message>{error}</Message> -> Error is passed as child in the component */

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  // Destructuring productListReducer
  const {error, loading, products} = productList

  // useEffect ->  Triggered every single time the component loads or when a state value gets updated
  // In our app it gets triggered when the component first loads
  // Empty array kept because we only want this to update when the component loads not when an actual state element gets updated
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])  

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products.map(product => (
                // Key attribute is needed to map for looping in react
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product ={product} />
                </Col>
            ))}
          </Row>
      }      
    </div>
  )
}

export default HomeScreen
