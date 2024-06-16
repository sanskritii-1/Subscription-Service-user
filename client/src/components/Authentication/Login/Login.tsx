import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Authentication.module.css";
import { sendData } from "../../../helper/util";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  let invalidInput = <p></p>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = { email: email, password: password };
      const response = await sendData('POST', 'login', false, data);
      if(response.token){
        localStorage.setItem('token', response.token);
      }
      else{
        throw new Error('Authentication failed');
      }
      navigate("/resources");
    } 
    catch (err) {
      console.log(err);
      window.alert(err);
    }
    // if (response) {
    //   invalidInput = <p>Invalid Email or Password!</p>;
    // }
  };

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        {invalidInput}
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
