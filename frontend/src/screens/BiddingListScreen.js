import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listBiddings, deleteBidding, createBidding } from '../actions/biddingActions'
import { BIDDING_CREATE_RESET } from '../constants/biddingConstants'


function BiddingListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { id } = useParams()

    const biddingList = useSelector(state => state.biddingList)
    // Destructuring biddingList and pulling out data
    const {loading, error, bidding_products, pages, page} = biddingList

    const biddingDelete = useSelector(state => state.biddingDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = biddingDelete
    
    const biddingCreate = useSelector(state => state.biddingCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, bidding_product:createdBidding} = biddingCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const location = useLocation()

    let keyword = location.search

    useEffect(() => {
        dispatch({type:BIDDING_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/bidding/${createdBidding._id}/edit`)
        }else{
            dispatch(listBiddings(keyword))
        }
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdBidding, keyword])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteBidding(id))
        }
    }

    const createBiddingHandler = () =>{
        dispatch(createBidding())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Bids</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createBiddingHandler}>
                        <i className='fa fa-plus'></i>Add Bidding Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading 
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>PRODUCT</th>
                                        <th>BIDDER</th>
                                        <th>PRICE</th>
                                        <th></th>
                                    </tr> 
                                </thead>

                                <tbody>
                                    {bidding_products.map(bidding_product => (
                                        <tr key={bidding_product._id}>
                                            <td>{bidding_product._id}</td>
                                            <td>{bidding_product.bidding_name}</td>
                                            <td>{bidding_product.highest_bidder}</td>
                                            <td>Rs. {bidding_product.current_price}</td>
                                            <td>
                                                <LinkContainer to={`/admin/bidding/${bidding_product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(bidding_product._id)}>
                                                        <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </div>
                    ) 
            }
        
        </div>
    )
}

export default BiddingListScreen
