import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from '../mysql-pool';

export class TournamentPage extends Component {
	tournamentID = 0;
	matches = [];
	teams = [];
	render() {
		return (
			<ul>
				{this.matches.map((matchInfo) => (
					<div key={matchInfo.MatchID}>
						Kampnummer:
						<NavLink to={'/matches/' + matchInfo.MatchID}>
							{matchInfo.MatchNumber}
						</NavLink>
						<br></br>
						Team 1: {matchInfo.Team1}
						<ul>
							{this.teams
								.filter((e) => e.TeamID == matchInfo.Team1)
								.map((teamMembers) => (
									<li key={teamMembers.TeamID}>{teamMembers.PlayerName}</li>
								))}
						</ul>
						Team 2: {matchInfo.Team2}
						<ul>
							{this.teams
								.filter((e) => e.TeamID == matchInfo.Team2)
								.map((teamMembers) => (
									<li key={teamMembers.TeamID}>{teamMembers.PlayerName}</li>
								))}
						</ul>
						Completed: {matchInfo.Completed}
						<br></br>
						Winner: {matchInfo.Winner}
						<br></br>
						<br></br>
					</div>
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

export class EditTournamentPage extends Component {
	matchInfo = null;

	render() {
		if (!this.matchInfo) return null;

		return (
			<ul>
				<li>Completed: {this.matchInfo.Completed}</li>
				<li>Winner: {this.matchInfo.Winner}</li>
			</ul>
		);
	}

	mounted() {
		pool.query(
			'SELECT Completed, Winner FROM GameMatch WHERE MatchID=?',
			[this.props.match.params.MatchID],
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				this.matchInfo = results[0];
			}
		);
	}
}
