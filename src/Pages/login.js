import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';


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


