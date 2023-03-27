import React from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { SEED } from '../env'
import Rating from './Rating'
import { Link } from 'react-router-dom'

// Product({ product }) -> Accessing products directly without using props
function Product({ product}) {

  return (
    <div>
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}> 
            <Card.Img src={`${SEED}${product.image}`} />
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}> 
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value = {product.rating} text={`${product.numReviews} reviews`} color={'#f8e826'} />
                </div>
            </Card.Text>

            <Card.Text as='h3'>
                Rs. {product.price}
            </Card.Text>
        </Card.Body>        
    </Card>
    </div>
  )
}
 

export default Product
