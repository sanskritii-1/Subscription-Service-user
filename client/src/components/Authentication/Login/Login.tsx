import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../Authentication.module.css";
import { sendData } from "../../../helper/util";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email: email, password: password };
    const response = await sendData("login", data, true);
    if (response) {
      setError("Invalid Email or Password!");
    }
    if (response.message) {
      setError("Invalid Email or Password!");
    }
    navigate("/protected");
  };

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error}
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
        <Link to='/register' className={classes.link}>Don't have an account? Create one!</Link>
      </form>
    </div>
  );
};

export default Login;
