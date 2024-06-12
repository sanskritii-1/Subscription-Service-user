import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from '../Authentication.module.css';
import { sendData } from "../Util";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendData('login', email, password);
    navigate('/');
  };

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
