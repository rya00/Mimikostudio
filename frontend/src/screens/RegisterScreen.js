import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            setMessage('The passwords do not match.')
        }else{
            dispatch(register(name, email, password))
        }
        
    }

    return (
        <FormContainer>
            <h1> Sign Up</h1>
            {/* Message is only shown when passwords do not match */}
            {message && <Message variant='danger'>{message}</Message>} 
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={ submitHandler }>
                <Form.Group controlId='name' className='grp-fields'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='grp-fields'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='grp-fields'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className='grp-fields'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'> 
                Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                    </Link>
                </Col>
            </Row>
        
        </FormContainer>
    )
}

export default RegisterScreen
