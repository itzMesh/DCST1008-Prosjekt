import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { pool } from '../Database/mysql-pool';
import { updateDatabase } from '../Database/services';
let x;
//this class renders and makes it posible to view old tournaments and create new one.
export class Overview extends Component {
	tournaments = [];
	updateDatabase = updateDatabase;
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
					<NavLink className="navigate" to="/new" onClick={() => newTour.play()}>
						New tournament
					</NavLink>
				</div>
			</div>
		);
	}
	//when your try to delete a tournament a waring pops up
	confirm(id) {
		document.getElementById('confirm').style.visibility = 'visible';

		x = id;
		document.getElementById('tournamentName').innerText =
			'Are you sure you want to delete "' + id.TournamentName + '"';
	}
	//if on the prompt you press no nothing happends
	nodelete() {
		document.getElementById('confirm').style.visibility = 'hidden';
	}
	// if yes pressed the tournament gets deleted
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
		document.body.style.backgroundImage = 'url(images/blur.png)';

		updateDatabase.selectAllTournaments((results) => (this.tournaments = results));
	}
}
