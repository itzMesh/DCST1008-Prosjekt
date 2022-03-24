import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

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
	userdata = [];
	render() {
		console.log(this.userdata);
		return (
			<div>
				<br />
				<input type="text" placeholder="Username" />
				<br />
				<input type="password" placeholder="Password" />
				<br />
				<NavLink to="/choose">
					<button type="button">Login</button>
				</NavLink>
			</div>
		);
	}
	mounted() {
		pool.query('SELECT * FROM User', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.userdata = results;
		});
	}
}

export class Signup extends Component {
	render() {
		return (
			<div>
				<br />
				<input type="text" placeholder="Username" />
				<br />
				<input type="password" placeholder="Password" />
				<br />
				<input type="password" placeholder="Confirm password" />
				<br />
				<NavLink to="/choose">
					<button type="button">Sign up</button>
				</NavLink>
			</div>
		);
	}
}
