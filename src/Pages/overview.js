import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../Database/mysql-pool';
import { updateDatabase } from '../Database/pushDatabase';
let x;
let intro = new Audio('./sound/scroll_loading_01.ogg');
let newTour = new Audio('./sound/supercell_jingle.ogg');

export class Overview extends Component {
	tournaments = [];
	render() {
		return (
			<div className="overview">
				<div>
					<div className="confirm" id="confirm">
						<p id="tournamentName"></p>
						<div>
							<em className="yesno" onClick={() => this.delete()}>
								Yes
							</em>
							<em className="yesno" onClick={() => this.nodelete()}>
								No
							</em>
						</div>
					</div>
				</div>
				<h1 className="title">
					<a>
						<span data-attr="Clas">Clas</span>
						<span data-attr="nering">Nering</span>
					</a>
				</h1>

				<div className="centerview">
					Overview of Tournaments <br />
					<br />
					<div className="border">
						<div className="scroll">
							{this.tournaments.map((tournament, i) => (
								<div key={i}>
									<div key={tournament.TournamentID} className="tournament">
										<button
											className="xx"
											onClick={() => this.confirm(tournament)}
										>
											X
										</button>
										<NavLink
											className="list"
											to={'/tournamentpage/' + tournament.TournamentID}
										>
											{tournament.TournamentName}
										</NavLink>
									</div>
									<br />
								</div>
							))}
						</div>
					</div>
					<br />
					<NavLink className="login" to="/new" onClick={() => newTour.play()}>
						New tournament
					</NavLink>
				</div>
			</div>
		);
	}

	confirm(id) {
		document.getElementById('confirm').style.visibility = 'visible';

		x = id;
		document.getElementById('tournamentName').innerText =
			'Are you sure you want to delete "' + id.TournamentName + '"';
	}

	nodelete() {
		document.getElementById('confirm').style.visibility = 'hidden';
	}

	delete() {
		document.getElementById('confirm').style.visibility = 'hidden';
		updateDatabase.deleteTournament(x.TournamentID, () => console.log());
		updateDatabase.deleteGameMatch(x.TournamentID, () => console.log());
		updateDatabase.deleteTeams(x.TournamentID, () => console.log());
		updateDatabase.deleteTeamMember(x.TournamentID, () => console.log());
		setTimeout(() => {
			this.mounted();
		}, 100);
	}

	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error);

			this.tournaments = results;
		});
		intro.play();
	}
}
