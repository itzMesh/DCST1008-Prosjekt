import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

export class Start extends Component {
	render() {
		return (
			<div className="start">
				Login:
				<NavLink to="/login"> Login </NavLink>
				Sign up:
				<NavLink to="/signup"> Sign up </NavLink>
				Overview:
				<NavLink to="/choose"> Choose </NavLink>
				Dev shortcut:
				<NavLink to="/tournamentPage/1"> Dev shortcut:</NavLink>
			</div>
		);
	}
}

export class Login extends Component {
	userdata = [];
	render() {
		console.log(this.userdata);
		return (
			<div
				style={{
					// backgroundColor: '#FFE5B4',
					backgroundColor: '#5865F2',
					width: '400px',
					height: '400px',
					marginLeft: '40%',
					borderRadius: '25%',
				}}
			>
				<br />
				<input
					style={{ marginLeft: '100px', marginTop: '50px', height: '30px' }}
					type="text"
					placeholder="Username"
				/>
				<br />
				<input
					style={{ marginLeft: '100px', marginTop: '50px', height: '30px' }}
					type="password"
					placeholder="Password"
				/>
				<br />
				<NavLink to="/choose">
					<button
						style={{
							marginLeft: '100px',
							marginTop: '50px',
							height: '30px',
							width: '100px',
						}}
						type="button"
					>
						Login
					</button>
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
