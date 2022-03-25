import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';

export class Overview extends Component {
	tournaments = [];
	render() {
		return (
			<div className="overview">
				<h1 className="title">Clasnering</h1>
				<br /> Overview of Tournaments <br />
				{this.tournaments.map((tournament) => (
					<li key={tournament.TournamentID}>
						<NavLink to={'/tournamentpage/' + tournament.TournamentID}>
							{tournament.TournamentName}
						</NavLink>
					</li>
				))}
				<br />
				<NavLink to="/new">New tournament</NavLink>
			</div>
		);
	}
	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error);

			this.tournaments = results;
		});
	}
}
