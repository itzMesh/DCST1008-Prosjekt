import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export class Signup extends Component {
	render() {
		return (
			<div>
				<br />
				<input className="input" type="text" placeholder="Username" />
				<br />
				<input className="input" type="password" placeholder="Password" />
				<br />
				<input className="input" type="password" placeholder="Confirm password" />
				<br />
				<NavLink className="login" to="/overview">
						Sign up
				</NavLink>
			</div>
		);
	}
}
