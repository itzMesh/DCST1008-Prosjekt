import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from '../mysql-pool';

class TournamentPage extends Component {
	tournamentID = 0;
	matches = [];
	teams = [];
	render() {
		return (
			<ul>
				{this.matches.map((matchInfo) => (
					<p key={matchInfo.MatchID}>
						Kampnummer: {matchInfo.MatchNumber}
						<br></br>
						Team 1: {matchInfo.Team1}
						<br></br>
						<ul>
							{this.teams.map((teamMembers) => (
								<li key={teamMembers.TeamID}>{teamMembers.PlayerName}</li>
							))}
						</ul>
						<br></br>
						Team 2: {matchInfo.Team2}
					</p>
				))}
			</ul>
		);
	}

	mounted() {
		pool.query('SELECT TeamID, PlayerName FROM TeamMember', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teams = results;
		});

		pool.query(
			'SELECT MatchID, TournamentID, MatchNumber, Team1, Team2, Completed, Winner FROM GameMatch',
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				this.matches = results;
			}
		);
	}
}

export default TournamentPage;
