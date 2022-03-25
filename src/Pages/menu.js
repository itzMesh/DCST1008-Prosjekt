import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export class Menu extends Component {
	render() {
		return (
			<div className="start">
				Login:
				<NavLink to="/login"> Login </NavLink>
				Sign up:
				<NavLink to="/signup"> Sign up </NavLink>
				Overview:
				<NavLink to="/overview"> Choose </NavLink>
				Dev shortcut:
				<NavLink to="/tournamentPage/1"> Dev shortcut:</NavLink>
			</div>
		);
	}
}
