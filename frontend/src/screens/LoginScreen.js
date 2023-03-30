import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import useUser from '../helper/useUser'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

        if (!emailRegex.test(email)){
            setEmailError("Please enter a valid email address.");
        } else if (email === "") {
            setEmailError("Email cannot be empty.");
        } else {
            setEmailError("");
        }
    }

    const validatePassword = (password) => {
        if (password === "") {
            setPasswordError("Password cannot be empty.");
        } else {
            setPasswordError("");
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }



  return (
    <FormContainer>
        <h1> Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value); 
                        validateEmail(e.target.value);
                    }}
                >
                </Form.Control>
                {emailError  && <Message variant="danger">{emailError}</Message>}
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                    }}
                >
                </Form.Control>
                {passwordError  && <Message variant="danger">{passwordError}</Message>}
            </Form.Group>

            <Button type='submit' variant='primary'> 
                Sign In
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                </Link>
            </Col>
        </Row>
      
    </FormContainer>
  )
}

export default LoginScreen

