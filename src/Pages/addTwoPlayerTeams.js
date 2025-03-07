import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { settings } from './newTournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import Torunament from '../Classes/tournament';
import { updateDatabase } from '../Database/services';

export let tournamentplayers = [null, new Date()];
let deleteId;
let deleteTeam;
//this class makes the page where you sign players up

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
		if (settings.gamemode[4] == 'D') {
			document.body.style.backgroundImage = 'url(images/purple.png)';
		}
		console.log(settings.gamemode);

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
					</div>{' '}
					{/* Delete promt me made that will accur when deleting a team */}
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
				<em className="navigate" type="button" onClick={this.buttonClicked}>
					Add team
				</em>

				<NavLink
					className="navigate"
					to={
						'/tournamentpage/' +
						(this.tournamentIDs[0] + 1) +
						'/' +
						(this.tournamentIDs[0] + 1)
					}
					onClick={(event) => this.createObjects(event)}
					type="button"
				>
					Create Tournament
				</NavLink>

				<br />
				<br />
				<div className="name">{settings.name}</div>
				{/* Creates a list of all the teams signed up for the tournament */}

				<div className="scrollTwoPlayer">
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
							{/*Gives each team a delete button with a unique ID*/}

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
				<div className="confirm" id="warning">
					<div className="overview">{this.warning}</div>
				</div>
			</div>
		);
	}
	//get prompted when trying to delete a player

	confirm(i, teams) {
		deleteId = i;
		deleteTeam = teams;

		document.getElementById('confirmT').style.visibility = 'visible';

		document.getElementById('teamName').innerText =
			'Are you sure you want to delete "' + deleteTeam[deleteId.target.id][0] + '"';
	}

	//if '"no" is pressed when the delete alert is prompted the method under is runned and hides the deleteprompt
	nodelete() {
		document.getElementById('confirmT').style.visibility = 'hidden';
	}

	//if "yes" is pressed when the delete alert is prompted the method under is runned and the player is deleted, it also hides the deleteprompt
	delete() {
		deleteTeam.splice(deleteId.target.id, 1);
		document.getElementById('confirmT').style.visibility = 'hidden';
	}

	//creates the tournament and send it for display
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
			this.warning =
				settings.gamemode.length == 0
					? 'OBS! You reloaded the page and have to go back a step and create a new tournament'
					: 'Nnot enough players';
			document.getElementById('warning').style.visibility = 'visible';
			setTimeout(() => {
				document.getElementById('warning').style.visibility = 'hidden';
			}, 1500);
			event.preventDefault();
		}
	}

	//checks if form is filled out correctly, if it is it pushes the player into an array
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
		document.body.style.backgroundImage = 'url(images/blur.png)';

		function database() {
			return new Promise((resolve) => {
				updateDatabase.selectAllTournaments((results) => {
					resolve(results);
				});
			});
		}

		function workWithDatabase(tournamentIDs) {
			return new Promise((resolve) => {
				tournamentIDs = tournamentIDs.map((Tournament) => Tournament.TournamentID);
				tournamentIDs.sort((a, b) => b - a);
				if (tournamentIDs.length == 0) {
					tournamentIDs.push(1);
				}
				resolve(tournamentIDs);
			});
		}

		async function Kjør() {
			try {
				let tournamentIDs = await database();
				let tournamentIDs2 = await workWithDatabase(tournamentIDs);
				console.log('test');

				return tournamentIDs2;
			} catch (error) {
				console.error(error);
			}
		}
		(async () => {
			this.tournamentIDs = await Kjør();
		})();

		function database2() {
			return new Promise((resolve) => {
				updateDatabase.selectAllTeams((results) => {
					resolve(results);
				});
			});
		}

		function workWithDatabase2(teamIDs) {
			return new Promise((resolve) => {
				teamIDs = teamIDs.map((Team) => Team.TeamID);
				teamIDs.sort((a, b) => b - a);
				if (teamIDs.length == 0) {
					teamIDs.push(1);
				}
				resolve(teamIDs);
			});
		}

		async function Kjør2() {
			try {
				let teamIDs = await database2();
				let teamIDs2 = await workWithDatabase2(teamIDs);

				return teamIDs2;
			} catch (error) {
				console.error(error);
			}
		}
		(async () => {
			this.teamIDs = await Kjør2();
		})();
	}
}
