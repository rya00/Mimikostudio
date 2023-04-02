import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordReset } from '../actions/userActions';
import { useLocation, useSearchParams } from 'react-router-dom';

const PasswordResetConfirmScreen = () => {
  const location = useLocation()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [queryParams] = useSearchParams();
  const uidb64 = queryParams.get('uidb64');
  const token = queryParams.get('token');

  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => {
    return state.passwordReset;
  });
  
  const { loading, error, success } = userPasswordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(passwordReset(uidb64, token, password));
      setMessage('Password reset successfully. You can now log in with your new password.');
    }
  };

  return (
    <div>
      <h1>Password Reset Confirmation</h1>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordResetConfirmScreen;
