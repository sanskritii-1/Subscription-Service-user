import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Authentication.module.css";
import { sendData } from "../../../helper/util";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const [toastContent, settoastContent] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      settoastContent("Passwords do not match!");
      console.log("error");
      return;
    }
    try {
      await sendData("POST", "register", false, { email: email, name:name, password: password });
      navigate("/login");
      
    } catch (err) {
      console.log(err);
      window.alert(err);
    }
  };

  const closeToastHandler = () => {
    settoastContent("");
  };

  return (
    <div className={classes.div}>
      <div className={toastContent !== "" ? classes.toast : undefined}>
        <div>
          <p className={classes.toastContent}>{toastContent}</p>
        </div>
        <div>
          <button
            className={classes.toastcloseButton}
            disabled={toastContent === "" && true}
            onClick={closeToastHandler}
          >
            X
          </button>
        </div>
      </div>
      <h2 className={classes.h1}>Signup</h2>
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
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
            maxLength={30}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
