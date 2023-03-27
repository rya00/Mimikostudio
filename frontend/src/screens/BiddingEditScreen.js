// import React, {useState, useEffect} from 'react'
// import axios from 'axios'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Form, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import FormContainer from '../components/FormContainer'
// import { listBiddingDetails, updateBidding } from '../actions/biddingActions'
// import { BIDDING_UPDATE_RESET } from '../constants/biddingConstants'

// function BiddingEditScreen() {
//     const {id} = useParams()

//     const biddingId = id

//     const [bidding_name, setName] = useState('')
//     const [bidding_description, setDescription] = useState('')
//     const [image, setImage] = useState('')
//     const [minimum_price, setMinimumPrice] = useState(0)
//     const [end_time, setEndTime] = useState(0)    
//     const [uploading, setUploading] = useState(false)

//     const navigate = useNavigate()

//     const dispatch = useDispatch()

//     const biddingDetails = useSelector(state => state.biddingDetails)
//     const {error, loading, bidding_product} = biddingDetails

//     const biddingUpdate = useSelector(state => state.biddingUpdate)
//     const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = biddingUpdate

//     useEffect(() => {
//         if(successUpdate){
//             dispatch({type:BIDDING_UPDATE_RESET})
//             console.log('test')
//             navigate('/admin/biddinglist')
//         }else{
//             if(!bidding_product.bidding_name || bidding_product._id !== Number(biddingId)){
//                 dispatch(listBiddingDetails(biddingId))
//             }else{
//                 setName(bidding_product.bidding_name)
//                 setMinimumPrice(bidding_product.minimum_price)
//                 setImage(bidding_product.image)
//                 setEndTime(bidding_product.end_time)
//                 setDescription(bidding_product.bidding_description)
//             }
//         }
//     }, [dispatch, bidding_product, biddingId, navigate, successUpdate])

//     const submitHandler = (e) => {
//         e.preventDefault()
//         dispatch(updateBidding({
//             _id:biddingId,
//             bidding_name,
//             minimum_price,
//             image,
//             end_time,
//             bidding_description
//         }))
//     }

//     const uploadFileHandler = async (e) => {
//         const file = e.target.files[0]
//         // Using form data function and adding file and product id to form data
//         const formData = new FormData()

//         formData.append('image', file)
//         formData.append('bidding_product_id', biddingId)

//         setUploading(true)

//         try{
//             const config = {
//                 headers: {
//                     'Content-Type':'multipart/form-data'
//                 }
//             }

//             const {data} = await axios.post('/api/biddings/upload/', formData, config)

//             setImage(data)
//             setUploading(false)
//         }catch(error){
//             setUploading(false)
//         }
//     }

//     return (
//         <div>
//             <Link to='/admin/biddinglist'>
//                 Go Back            
//             </Link>
//             <FormContainer>
//                 <h1> Edit Bidding</h1>
//                 {loadingUpdate && < Loader />}
//                 {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
//                 {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
//                     :(
//                         <Form onSubmit={ submitHandler }>
//                             <Form.Group controlId='biddingname'>
//                                 <Form.Label>Bidding Name:</Form.Label>
//                                 <Form.Control
//                                     type='biddingname'
//                                     placeholder='Enter name'
//                                     value={bidding_name}
//                                     onChange={(e) => setName(e.target.value) }
//                                 >
//                                 </Form.Control>
//                             </Form.Group>

//                             <Form.Group controlId='minimumprice'>
//                                 <Form.Label>Minimum Price:</Form.Label>
//                                 <Form.Control
//                                     type='number'
//                                     placeholder='Enter minimum price'
//                                     value={minimum_price}
//                                     onChange={(e) => setPrice(e.target.value) }
//                                 >
//                                 </Form.Control>
//                             </Form.Group>

//                             <Form.Group controlId='image'>
//                                 <Form.Label>Image:</Form.Label>
//                                 <Form.Control
//                                     type='text'
//                                     placeholder='Enter image'
//                                     value={image}
//                                     onChange={(e) => setImage(e.target.value) }
//                                 >
//                                 </Form.Control>
//                                 <Form.Control
//                                     type='file'
//                                     name='file'
//                                     onChange={uploadFileHandler}
//                                 >
//                                 </Form.Control>
//                                 {uploading && <Loader />}
//                             </Form.Group>

//                             <Form.Group controlId='enddate'>
//                                 <Form.Label>End Date:</Form.Label>
//                                 <Form.Control
//                                     type='date'
//                                     placeholder='Enter end date'
//                                     value={end_time}
//                                     onChange={(e) => setCategory(e.target.value) }
//                                 >
//                                 </Form.Control>
//                             </Form.Group>

//                             <Form.Group controlId='biddingdescription'>
//                                 <Form.Label>Description:</Form.Label>
//                                 <Form.Control
//                                     type='text'
//                                     placeholder='Enter description'
//                                     value={bidding_description}
//                                     onChange={(e) => setDescription(e.target.value) }
//                                 >
//                                 </Form.Control>
//                             </Form.Group>                           

//                             <Button type='submit' variant='primary'> 
//                                 Update
//                             </Button>
//                         </Form>
//                     )
//                 }                        
//             </FormContainer>
//         </div>
//     )
// }

// export default BiddingEditScreen
