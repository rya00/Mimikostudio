import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmPasswordReset } from "../actions/userActions";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PasswordResetConfirmScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { uidb64, token } = useParams();

  const passwordReset = useSelector((state) => state.passwordReset);
  const { loading, error, success } = passwordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      dispatch(confirmPasswordReset(uidb64, token, password));
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">Password successfully reset</div>
      )}
<form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordResetConfirmScreen;