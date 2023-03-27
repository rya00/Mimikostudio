import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBiddingDetails, createProductBid } from '../actions/biddingActions'
import { SEED } from '../env'
import { PRODUCT_CREATE_BID_RESET } from '../constants/biddingConstants'


function BiddingProductScreen( ) {
    const [amount, setAmount] = useState(0)
    const [highest_bidder, setHighestBidder] = useState('')
    // let bidCount = response.bid_count;

    const dispatch = useDispatch();

    const biddingDetails = useSelector((state) => state.biddingDetails);
    const { loading, error, bidding_product } = biddingDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productBidCreate = useSelector((state) => state.productBidCreate);
    const { loading:loadingProductBid, error:errorProductBid, success:successProductBid } = productBidCreate;
  
    const { id } = useParams();
    const navigate = useNavigate()

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    useEffect(() => {
        if(successProductBid){
            setAmount(0)
            setHighestBidder('')
            dispatch({type:PRODUCT_CREATE_BID_RESET})

        }
        dispatch(listBiddingDetails(id));
    }, [dispatch, id, successProductBid]);

    const submitBidHandler = (e) => {
        e.preventDefault();
      
        if (amount <= bidding_product.minimum_price) {
          alert('Amount must be greater than minimum price.');
          return;
        }
      
        if (amount <= bidding_product.current_price) {
          alert('Amount greater than current price must be kept.');
          return;
        }
      
        dispatch(createProductBid(id, { amount, highest_bidder }));
    };

    return (
        <div>
            <Link to = '/biddings' className='btn btn-light my-3'>Go back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    :(
                        <div>
                            <Row>
                                <Col md = {6} className='w-50'>
                                    <Image src={`${SEED}${bidding_product.image}`} alt={bidding_product.name} fluid height='300px' width='400px'/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{bidding_product.bidding_name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                          Highest Bidder: {bidding_product.highest_bidder}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Highest Price: Rs. {bidding_product.current_price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {bidding_product.bidding_description}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Starting Price:</Col>
                                                    <Col>
                                                        <strong>Rs. {bidding_product.minimum_price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>End Time:</Col>
                                                    <Col>
                                                        <strong>{bidding_product.end_time}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {bidding_product.end_time < {date} ? 'Bidding is ongoing.' : 'Sorry, the time has ended.'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {/* <ListGroup.Item>
                                                <Row>
                                                    <Col>Bids:</Col>
                                                    <Col>
                                                    <strong value={bidding_product.bid} text={`${bidding_product.numBids} bids`} />
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> */}
                                            
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Your Price:</Col>
                                                    <Col>
                                                        <Form.Group controlId='bid'>
                                                            <Form.Label>Your Bid</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                row='5'
                                                                value={amount}
                                                                onChange={(e) => setAmount(e.target.value)}
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {userInfo? (
                                                <ListGroup.Item>
                                                <Button 
                                                    onClick={submitBidHandler}
                                                    className='btn-block' 
                                                    type='button'
                                                > 
                                                    Bid
                                                </Button>
                                            </ListGroup.Item>):(
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to bid.</Message>
                                            )}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            {/* <Row>
                            <Col md={6}>
                                <h4>Bids</h4>
                                {bidding_product.bids.length === 0 && <Message variant='info'>No Bids</Message>}
                                {bidding_product.bids.length > 0 && 
                                    <div>
                                    <p>Total Bids: {bidding_product.bids}</p>
                                    <ListGroup variant='flush'>
                                        {bidding_product.bids.map((bid) => (
                                        <ListGroup.Item key={bid._id}>
                                            <strong>{bid.bidder}</strong>
                                            <strong>{bid.amount}</strong>
                                            <p>{bid.timestamp.substring(0, 10)}</p>
                                        </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    </div>
                                }
                            </Col>
                            </Row> */}
                        </div>
                    )

            }
        </div>
    )
}

export default BiddingProductScreen

