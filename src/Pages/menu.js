import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export class Menu extends Component {
	render() {
		return (
			<div>
				<em>
					<NavLink className="navigate" to="/overview">
						{' '}
						Overview{' '}
					</NavLink>
				</em>
			</div>
		);
	}
}
