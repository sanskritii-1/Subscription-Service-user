import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Authentication.module.css";
import { sendData } from "../../../helper/util";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  let invalidInput = <p></p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email: email, password: password };
    try {
      const response = await sendData("login", data, true);
      if (response) {
        invalidInput = <p>Invalid Email or Password!</p>;
      }
    } catch (error) {
      setError(error);
    }
    navigate("/subscriptions");
  };

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        {invalidInput}
        <p className={classes.error}>{error && error}</p>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
