import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';



export class Start extends Component {
  render() {
    return (
        <div>

          Login: 
          <NavLink to="/login"> Login </NavLink>

          Sign up: 
          <NavLink to="/signup"> Sign up</NavLink>
        </div>
    );
  }
}

export class Login extends Component {
  render() {
    return <div>
      <br/> 
      <input type="text" placeholder="Username" /><br />
      <input type="password" placeholder="Password" /><br />
      <NavLink to="/choose">
        <button type="button">Login</button>
      </NavLink>
 </div>;
  }
}

export class Signup extends Component {
  render() {
    return <div>
      <br/><input type="text" placeholder="Username" /><br />
    <input type="password" placeholder="Password" /><br />
    <input type="password" placeholder="Confirm password" /><br />
    <NavLink to="/choose">
        <button type="button">Sign up</button>
      </NavLink>
      </div>;
  }
}


