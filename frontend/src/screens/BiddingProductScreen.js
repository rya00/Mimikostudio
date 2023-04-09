import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col,Table, Image, ListGroup, Button, Card, Form, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBiddingDetails, createProductBid } from '../actions/biddingActions'
import { SEED } from '../env'
import { PRODUCT_CREATE_BID_RESET } from '../constants/biddingConstants'


function BiddingProductScreen( ) {
    const [amount, setAmount] = useState(0)
    const [highest_bidder, setHighestBidder] = useState('')
    // let bidCount = response.bid_count;

    const [bids, setBids] = useState([]);

    const dispatch = useDispatch();
    const [message, setMessage] = useState('')

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

    // Convert the end_time string to a Date object
    const endTime = new Date(bidding_product.end_time);

    // Check if the current time is before or equal to the end of the day
    const canBid = endTime > current || (endTime.getDate() === current.getDate() && endTime.getMonth() === current.getMonth() && endTime.getFullYear() === current.getFullYear());
      

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

        // Parse the amount as a number
        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setMessage('Please enter a valid amount.');
            return;
        } else if (parsedAmount <= bidding_product.minimum_price) {
            setMessage('Amount must be greater than minimum price.');
            return;
        } else if (parsedAmount <= bidding_product.current_price) {
            setMessage('Amount greater than current price must be kept.');
            return;
        } else {
            setMessage('');
        }

        // Dispatch the createProductBid action with the parsedAmount instead of the amount
        dispatch(createProductBid(id, { id, amount: parsedAmount, highest_bidder }));
    };
    
    useEffect(() => {
        if (bidding_product && bidding_product.bids) {
          setBids(bidding_product.bids);
        }
      }, [bidding_product]);

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
                                                        <strong>{new Date(bidding_product.end_time).toLocaleDateString()}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <div>
                                                    <Row>
                                                    {userInfo && canBid ? (
                                                        <>
                                                        <Col>Your Price:</Col>
                                                        <form onSubmit={submitBidHandler}>
                                                            <input
                                                            type='textarea'
                                                            placeholder='Enter amount'
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            />
                                                            <br></br>
                                                            <button type='submit'>Bid</button>
                                                            {message && <Message variant='danger'>{message}</Message>}
                                                        </form>
                                                        </>
                                                    ) : (
                                                        <p>
                                                        Please {userInfo ? 'wait for the next bidding event' : <Message variant='info'>Please <Link to='/login'>login</Link> to bid.</Message>}.
                                                        </p>
                                                    )}
                                                    {errorProductBid && <p>{errorProductBid}</p>}
                                                    {successProductBid && <p>Bid successfully placed.</p>}
                                                    </Row>
                                                </div>
                                                </ListGroup.Item>

                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Bids</h4>
                                    {bids.length > 0 ? (
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Bidder Email</th>
                                            <th>Highest Bid Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bids.map((bid) => (
                                            <tr key={bid.id}>
                                                <td>{bid.bidder.email}</td>
                                                <td>{bid.amount}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    ) : (
                                    <p>No bids yet.</p>
                                    )}
                                </Col>
                            </Row>

                        </div>
                    )

            }
        </div>
    )
}

export default BiddingProductScreen

