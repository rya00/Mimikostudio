import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login, resetPassword } from "../actions/userActions";

function LoginScreen() {
  const locate = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const redirect = locate.search ? locate.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const passwordResetState = useSelector((state) => state.passwordReset);
  const {
    loading: resetLoading,
    error: resetError,
    success: resetSuccess,
  } = passwordResetState;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else if (email === "") {
      setEmailError("Email cannot be empty");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  //on submit get credentials to make api call to user login and get tokens, set state and store data in local storage
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const resetPasswordHandler = () => {
    dispatch(resetPassword(email));
  };

  return (
    <FormContainer>
      <h1> Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          ></Form.Control>
          {emailError && <Message variant="danger">{emailError}</Message>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="standard-btn">
          Sign In
        </Button>
      </Form>

      <Button onClick={resetPasswordHandler}>Reset Password</Button>
      {resetLoading && <div>Loading...</div>}
      {resetError && <div>{resetError}</div>}
      {resetSuccess && <div>Password reset email sent.</div>}
      <Row className="py-3">
        <Col>
          No account?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
