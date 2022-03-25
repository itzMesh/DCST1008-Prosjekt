import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

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
				<NavLink to="/overview">
					<button type="button">Sign up</button>
				</NavLink>
			</div>
		);
	}
}
