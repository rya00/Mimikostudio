// useState and useEffect used for connecting to backend
import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// Connecting to backend
import axios from 'axios'


function HomeScreen() {
  // Setting state and method to update the state
  const [products, setProducts] = useState([])

  // useEffect ->  Triggered every single time the component loads or when a state value gets updated
  // In our app it gets triggered when the component first loads
  // Empty array kept because we only want this to update when the component loads not when an actual state element gets updated
  useEffect(() => {
    async function fetchProducts(){
      const {data} = await axios.get('/api/products/')
      setProducts(data)
    }

    fetchProducts()     
  }, [])


  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
            // Key attribute is needed to map for looping in react
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product ={product} />
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
