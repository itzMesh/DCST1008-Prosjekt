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
				Overview of Tournaments <br />
				<div className="scroll">
					{this.tournaments.map((tournament) => (
						<li className="login" key={tournament.TournamentID}>
							<NavLink
								className="login"
								to={'/tournamentpage/' + tournament.TournamentID}
							>
								{tournament.TournamentName}
							</NavLink>
						</li>
					))}
				</div>
				<br />
				<NavLink className="login" to="/new">
					New tournament
				</NavLink>
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
