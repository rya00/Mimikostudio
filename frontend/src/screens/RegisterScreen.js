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
    
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    const validateName = (name) => {
        if (name === "") {
            setNameError("Name cannot be empty.");
        } else {
            setNameError("");
        }
    }

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

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword === "") {
            setConfirmPasswordError("Password cannot be empty.");
        } else {
            setConfirmPasswordError("");
        }
    }

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
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateName(e.target.value);
                        }}
                    >
                    </Form.Control>
                    {nameError  && <Message variant="danger">{nameError}</Message>}
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
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
                        required
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

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validateConfirmPassword(e.target.value);
                        }}
                    >
                    </Form.Control>
                    {confirmPasswordError  && <Message variant="danger">{confirmPasswordError}</Message>}
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
