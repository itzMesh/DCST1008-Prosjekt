import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';

export class Login extends Component {
	userdata = [];
	render() {
		console.log(this.userdata);
		return (
			<div>
				<br />
				<input className="input" type="text" placeholder="Username" />
				<br />
				<input className="input" type="password" placeholder="Password" />
				<br />
				<NavLink className="login" to="/overview">
						Login
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
