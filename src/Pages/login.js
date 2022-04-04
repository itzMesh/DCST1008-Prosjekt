import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { useNavigate } from 'react-router-dom';

let user = [];

export class Login extends Component {
	check() {
		for (let i = 0; i < user.length; i++) {
			if (
				document.getElementById('username').value == user[0][i].Username &&
				document.getElementById('password').value == user[0][i].Password
			) {
				const navigate = useNavigate();
				navigate('/overview');
			} else {
				console.log(1);
			}
		}
	}
	render() {
		return (
			<div>
				<br />
				<input id="username" className="input" type="text" placeholder="Username" />
				<br />
				<input id="password" className="input" type="password" placeholder="Password" />
				<br />
				<button className="login" onClick={this.check}>
					Login
				</button>
			</div>
		);
	}
	mounted() {
		pool.query('SELECT * FROM User', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			user.push(results);
		});
	}
}
