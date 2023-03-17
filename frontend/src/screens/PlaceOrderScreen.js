import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { SEED } from '../env'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {
    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    // Setting shipping price. if > 50000 then free
    cart.shippingPrice = (cart.itemsPrice > 50000 ? 0: 200).toFixed(2)

    // Tax rate = 0.082
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() =>{
      if(!cart.paymentMethod){
      navigate('/payment')
    }})
    
    useEffect(() =>{
      if(success){
        navigate(`/order/${order._id}`)
        dispatch({type: ORDER_CREATE_RESET})
      }
    }, [navigate, success, order])

    const placeOrderHandler = () => {
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }))
    }


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h2 className='auto-underline-animation'>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {' '}
                {cart.shippingAddress.postalCode}, 
                {' '}
                {cart.shippingAddress.country}
              </p>
              </ListGroup.Item>
            
              <ListGroup.Item>
                <h2 className='auto-underline-animation'>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <h2 className='auto-underline-animation'>Order Items</h2>
                {cart.cartItems.length === 0 ? <Message variant='info'>
                  Your cart is empty
                </Message> : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item,index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                          <Image src={`${SEED}${item.image}`} alt={item.name} fluid rounded/>
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}

                  </ListGroup>
                )}
              </ListGroup.Item>

            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>


                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block standard-btn'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order                    
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      
    </div>
  )
}

export default PlaceOrderScreen
