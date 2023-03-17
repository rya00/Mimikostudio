import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import {IoIosArrowBack} from "react-icons/io"


function ProductEditScreen() {
    const {id} = useParams()

    const productId = id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            console.log('test')
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, product, productId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        // Using form data function and adding file and product id to form data
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light go-back-btn'>
                <IoIosArrowBack size={20}/>
                Go Back            
            </Link>
            <FormContainer>
                <h1 className='auto-underline-animation'> Edit Product</h1>
                {loadingUpdate && < Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                    :(
                        <Form onSubmit={ submitHandler }>
                            <Form.Group controlId='name' className='grp-fields'>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className='grp-fields'>
                                <Form.Label>Price:</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className='grp-fields'>
                                <Form.Label>Image:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value) }
                                    style={{marginBottom: 15}}
                                >
                                </Form.Control>
                                <Form.Control
                                    type='file'
                                    name='file'
                                    onChange={uploadFileHandler}
                                >
                                </Form.Control>
                                {uploading && <Loader />}
                            </Form.Group>

                            <Form.Group controlId='category' className='grp-fields'>
                                <Form.Label>Category:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock' className='grp-fields'>
                                <Form.Label>Stock:</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description' className='grp-fields'>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value) }
                                >
                                </Form.Control>
                            </Form.Group>                           

                            <Button type='submit' variant='primary' className='standard-btn'> 
                                Update
                            </Button>
                        </Form>
                    )
                }                        
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
