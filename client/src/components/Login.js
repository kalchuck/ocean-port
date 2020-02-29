import React from "react";
import { Link } from "react-router-dom";
import { Button, Label } from 'reactstrap';

const Login = (props) => {

  return (
    <div>
    <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3"></div>
      <h1>Log In</h1>
      <form className="login">
          <div className="form-group">
            <Label for="username">username</Label>
            <input 
              type="email" 
              className="form-control" 
              id="email-input" 
              placeholder="username" 
              value={props.email}
              onChange={props.handleInputChange}
              />

            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password-input" 
              placeholder="Password" 
              value={props.password}
              onChange={props.handleInputChange}
              />
          </div>
          <Button type="submit" className="btn btn-default" onClick={props.handleLogin}>Login</Button>
        </form>
        <br />
        <p className="signupLink"> <Link to="/signup">Don't have an account? Launch your account here!</Link></p>
      </div>
      </div>
    </div>
  );
};

export default Login;
