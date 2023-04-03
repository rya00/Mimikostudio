import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPasswordReset  } from '../actions/userActions';

const PasswordResetScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, success } = userPasswordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(confirmPasswordReset(email));
    setMessage('Password reset email has been sent. Please check your inbox.');
  };

  return (
    <div>
      <h1>Password Reset</h1>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordResetScreen;