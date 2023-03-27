import React from 'react'
import { Card } from 'react-bootstrap'
import { SEED } from '../env'
import { Link } from 'react-router-dom'

// Product({ product }) -> Accessing products directly without using props
function BiddingProduct ({ bidding_product }) {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/bidding/${bidding_product._id}`}> 
            <Card.Img src={`${SEED}${bidding_product.image}`} />
        </Link>

        <Card.Body>
            <Link to={`/bidding/${bidding_product._id}`}> 
                <Card.Title as="div">
                    <strong>{bidding_product.bidding_name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <div className='my-3'>
                    <strong>Highest Bidder: {bidding_product.highest_bidder}</strong>
                </div>  
            </Card.Text>

            <Card.Text as='div'>
                <div className='my-3'>
                    <strong>Highest Bid: {bidding_product.current_price}</strong>
                </div>
            </Card.Text>
        </Card.Body>        
    </Card>
  )
}

export default BiddingProduct
