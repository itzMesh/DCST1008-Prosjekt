import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from '../Database/mysql-pool';
import { NavLink } from 'react-router-dom';
import { settings } from './newTournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import Torunament from '../Classes/tournament';

export let tournamentplayers = [null, new Date()];
let deleteId;
let deleteTeam;
export class AddTwoPlayerTeams extends Component {
	tournamentplayers = tournamentplayers;
	settings = settings;
	team = '';
	name1 = '';
	trophies1 = '';
	name2 = '';
	trophies2 = '';
	teams = [];
	teamObj = [];
	form = null;
	link = '';
	tournamentIDs = [];
	teamIDs = [];
	teamID = 0;

	render() {
		if (this.tournamentIDs.length == 0) return null;

		return (
			<div>
				<div className="overview">
					<div className="confirm" id="confirmT">
						<p id="teamName"></p>
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
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<br />
					<em className="text">Team</em>
					<input
						className="input"
						type="text"
						value={this.team}
						placeholder="Team name"
						size="20x"
						onChange={(event) => (this.team = event.currentTarget.value)}
						required
					/>
					<br />
					<em className="player">Player 1</em>
					<input
						className="input"
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="20"
						onChange={(event) => (this.name1 = event.currentTarget.value)}
						required
					/>
					<input
						className="input"
						type="number"
						value={this.trophies1}
						placeholder="Trophies"
						size="10"
						min="0"
						onChange={(event) => (
							(this.trophies1 = event.currentTarget.value),
							"validity.valid||(value='');"
						)}
						required
					/>
					<br />
					<em className="text">Player 2</em>
					<input
						className="input"
						type="text"
						value={this.name2}
						placeholder="Nickname"
						size="20"
						onChange={(event) => (this.name2 = event.currentTarget.value)}
						required
					/>
					<input
						className="input"
						type="number"
						value={this.trophies2}
						placeholder="Trophies"
						size="10"
						min="0"
						onChange={(event) => (
							(this.trophies2 = event.currentTarget.value),
							"validity.valid||(value='');"
						)}
						required
					/>
					<br />
				</form>
				<br />
				<em className="login" type="button" onClick={this.buttonClicked}>
					Add team
				</em>

				<NavLink
					className="login"
					to={
						'/tournamentpage/' +
						(this.tournamentIDs[0] + 1) +
						'/' +
						(this.tournamentIDs[0] + 1)
					}
					onClick={() => this.createObjects()}
					type="button"
				>
					Create Tournament
				</NavLink>

				<br />
				<br />
				<div className="name">{settings.name}</div>

				<div className="scrollPlayer">
					{this.teams.map((team, i) => (
						<div className="small" key={i} style={{ float: 'left' }}>
							<button
								className="x"
								type="button"
								id={i}
								onClick={(i) => this.confirm(i, this.teams)}
							>
								x
							</button>
							<em key={0}>Team: {team[0]}</em>
							<div key={1}>
								Name: {team[1][0]}, {team[1][1]}{' '}
								<img
									src={'./images/trophies.png'}
									height={'25px'}
									width={'25px'}
								></img>
							</div>
							<div key={2}>
								Name: {team[2][0]}, {team[2][1]}{' '}
								<img
									src={'./images/trophies.png'}
									height={'25px'}
									width={'25px'}
								></img>
							</div>
							<br />
							<br />
						</div>
					))}
				</div>
			</div>
		);
	}

	confirm(i, teams) {
		deleteId = i;
		deleteTeam = teams;

		document.getElementById('confirmT').style.visibility = 'visible';

		document.getElementById('teamName').innerText =
			'Are you sure you want to delete "' + deleteTeam[deleteId.target.id][0] + '"';
	}

	nodelete() {
		document.getElementById('confirmT').style.visibility = 'hidden';
	}

	delete() {
		deleteTeam.splice(deleteId.target.id, 1);
		document.getElementById('confirmT').style.visibility = 'hidden';
	}

	createObjects(event) {
		if (this.teams.length > 1) {
			this.teamObj = [];
			this.teamID = parseInt(this.teamIDs[0]);
			for (const i of this.teams) {
				this.teamID++;
				let aTeam = new Team(i[0], this.teamID, this.tournamentIDs[0] + 1);
				aTeam.addMember(
					new TeamMember(i[1][0], parseInt(i[1][1]), aTeam.id, this.tournamentIDs[0] + 1)
				);
				aTeam.addMember(
					new TeamMember(i[2][0], parseInt(i[2][1]), aTeam.id, this.tournamentIDs[0] + 1)
				);
				this.teamObj.push(aTeam);
			}
			tournamentplayers = [
				new Torunament(settings.name, this.tournamentIDs[0] + 1, this.teamObj, settings),
				new Date(),
			];
		} else {
			event.preventDefault();
		}
	}

	buttonClicked() {
		if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1], [this.name2, this.trophies2]]);
		this.team = '';
		this.name1 = '';
		this.trophies1 = '';
		this.name2 = '';
		this.trophies2 = '';
	}

	mounted() {
		pool.query('SELECT TournamentID FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournamentIDs = results;
			this.tournamentIDs = this.tournamentIDs.map((Tournament) => Tournament.TournamentID);
			this.tournamentIDs.sort((a, b) => b - a);
			if (this.tournamentIDs.length == 0) {
				this.tournamentIDs.push(1);
			}
		});
		pool.query('SELECT TeamID FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teamIDs = results;
			this.teamIDs = this.teamIDs.map((Team) => Team.TeamID);
			this.teamIDs.sort((a, b) => b - a);
			if (this.teamIDs.length == 0) {
				this.teamIDs.push(1);
			}
		});
	}
}
