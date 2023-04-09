import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { SEED } from "../env";
import KhaltiCheckout from "khalti-checkout-web";
import config from "../components/KhaltiConfig";

function OrderScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderId = id;
  const dispatch = useDispatch();

  const [khaltiReady, setKhaltiReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addKhaltiScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://khalti.com/static/khalti-checkout.js";
    script.async = true;
    script.onload = () => {
      setKhaltiReady(true);
    };
    document.body.appendChild(script);
  };

  let checkout = new KhaltiCheckout(config(dispatch, orderId, order));

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.khalti) {
        addKhaltiScript();
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, navigate, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading  ? (
    <Loader />
  ) :  error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
      <div>
          <h1>Order: {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                <h2 className='auto-underline-animation'>Shipping</h2>
                <p><strong>Name: </strong>{order.user.name}</p>
                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                <p>
                  <strong>Shipping: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {' '}
                  {order.shippingAddress.postalCode}, 
                  {' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                    <Message variant='success'>Delivered On: {order.deliveredAt}</Message>
                  ) : (
                    <Message variant='warning'>Not Delivered</Message>
                  )
                  }
                </ListGroup.Item>
              
                <ListGroup.Item>
                  <h2 className='auto-underline-animation'>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid On: {order.paidAt}</Message>
                  ) : (
                    <Message variant='warning'>Not Paid</Message>
                  )
                  }
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <h2 className='auto-underline-animation'>Order Items</h2>
                  {order.orderItems.length === 0 ? <Message variant='info'>
                    No orders have been placed.
                  </Message> : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item,index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                            <Image src={`${SEED}${item.image}`} alt={item.name} fluid rounded/>
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} X Rs. {item.price} = Rs. {(item.qty * item.price).toFixed(2)}
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
                      <Col>Rs. {order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>Rs. {order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>Rs. {order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total:</Col>
                      <Col>Rs. {order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader/>}

                      {khaltiReady && order.paymentMethod === "khalti" ? (
                        <div className="d-grid gap-2">
                          <Button
                            type="button"
                            disabled={loadingPay}
                            amount={order.totalPrice}
                            onClick={() =>
                            checkout.show({ amount: order.totalPrice * 100 })
                            }
                          >
                            Pay with Khalti
                          </Button>
                        </div>
                      ) : (
                        <div className="center">
                          <h5>Proceed with cash</h5>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>

                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </Card>
            </Col>
          </Row>
      </div>
    )
  }

export default OrderScreen
