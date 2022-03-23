import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { editService } from '../Classes/editTournamentPage';

let eksternTournamentID = 0;

export class TournamentPage extends Component {
	matches = [];
	teamMember = [];
	team = [];
	render() {
		return (
			<ul>
				{this.matches
					.filter((e) => e.TournamentID == eksternTournamentID)
					.map((matchInfo) => (
						<div key={matchInfo.MatchID}>
							Kampnummer:
							<NavLink to={'/matches/' + matchInfo.MatchID + '/edit'}>
								{matchInfo.MatchNumber}
							</NavLink>
							<br></br>
							Team 1:
							{this.team
								.filter((e) => e.TeamID == matchInfo.Team1)
								.map((teamName) => (
									<em key={teamName.TeamID}> {teamName.TeamName}</em>
								))}
							<ul>
								{this.teamMember
									.filter((e) => e.TeamID == matchInfo.Team1)
									.map((teamMembers) => (
										<li key={teamMembers.TeamID}>{teamMembers.PlayerName}</li>
									))}
							</ul>
							Team 2:
							{this.team
								.filter((e) => e.TeamID == matchInfo.Team2)
								.map((teamName) => (
									<em key={teamName.TeamID}> {teamName.TeamName}</em>
								))}
							<ul>
								{this.teamMember
									.filter((e) => e.TeamID == matchInfo.Team2)
									.map((teamMembers) => (
										<li key={teamMembers.TeamID}>{teamMembers.PlayerName}</li>
									))}
							</ul>
							<br></br>
						</div>
					))}
			</ul>
		);
	}

	mounted() {
		pool.query('SELECT TeamID, PlayerName FROM TeamMember', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teamMember = results;
		});

		pool.query(
			'SELECT MatchID, TournamentID, MatchNumber, Team1, Team2, Completed, Team1Score, Team2Score FROM GameMatch',
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				this.matches = results;
			}
		);
		pool.query('SELECT TeamID, TeamName FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.team = results;
		});
	}
}

export class EditTournamentPage extends Component {
	match = null;

	render() {
		if (!this.match) return null;

		return (
			<div>
				<ul>
					<li>
						Completed:{' '}
						<input
							type="text"
							value={this.match.Completed}
							onChange={(event) => (this.match.Completed = event.currentTarget.value)}
						/>
					</li>
					<li>
						Team 1 Score:{' '}
						<input
							type="number"
							value={this.match.Team1Score}
							onChange={(event) =>
								(this.match.Team1Score = event.currentTarget.value)
							}
						/>
					</li>
					<li>
						Team 2 Score:{' '}
						<input
							type="number"
							value={this.match.Team2Score}
							onChange={(event) =>
								(this.match.Team2Score = event.currentTarget.value)
							}
						/>
					</li>
				</ul>
				<button type="button" onClick={this.save}>
					Save
				</button>
			</div>
		);
	}

	mounted() {
		editService.getWinner(this.props.match.params.MatchID, (match) => {
			this.match = match;
		});
	}

	save() {
		editService.updateWinner(this.match, () => {
			history.push('/matches/' + this.match.MatchID);
		});
	}
}
