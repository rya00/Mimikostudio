import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
// Connecting to backend
import axios from 'axios'
//import products from '../products'


function ProductScreen( ) {
    const [product, setProduct] = useState([])
    const {id} = useParams();
    //console.log(id)

    useEffect(() => {
        async function fetchProduct(){
        const {data} = await axios.get(`/api/products/${id}`)
        setProduct(data)
        }

        fetchProduct()     
    }, [id])

    // const product = products.find((p) => p._id == useParams.id)

    //console.log(product.image)

    return (
        <div>
            <Link to = '/' className='btn btn-light my-3'>Go back</Link>
            <Row>
                <Col md = {6} className='w-50'>
                    <Image src={product.image} alt={product.name} width={500} height={500} />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: Rs. {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                 <Button className='btn-block' disabled={product.countInStock === 0} type='button'> Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen

