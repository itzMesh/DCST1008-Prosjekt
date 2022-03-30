import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { updateDatabase } from '../Classes/pushDatabase';
// import { dialog } from 'electron';
import { alert } from './widgets';
const { dialog } = require('electron').remote.dialog;

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
							<button onClick={() => this.delete(tournament)}>X</button>
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
	delete(id) {
		console.log(dialog);
		// if (dialog.showOpenDialog({ properties: ['delete', 'cancel'] } == 'delete')()) {
		// 	// updateDatabase.deleteTournament(id.TournamentID, () => console.log());
		// 	// updateDatabase.deleteGameMatch(id.TournamentID, () => console.log());
		// 	// updateDatabase.deleteTeams(id.TournamentID, () => console.log());
		// 	// updateDatabase.deleteTeamMember(id.TournamentID, () => console.log());
		// 	// this.mounted();
		// }
	}
	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error);

			this.tournaments = results;
		});
	}
}
