import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import Torunament from '../Classes/tournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import { settings } from './newTournament';
import { updateDatabase } from '../Database/services';

let deleteId;
let deleteTeam;

export let tournamentplayer = [null, new Date()];

//this class makes the page where you sign players up
export class AddSinglePlayer extends Component {
	warning = '';
	tournamentplayer = tournamentplayer;
	settings = settings;
	team = '';
	name1 = '';
	trophies1 = '';
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
				{/* Delete promt me made that will accur when deleting a player */}

				<form ref={(instance) => (this.form = instance)}>
					<br />
					<br />
					<em className="text">Player</em>
					<input
						className="input"
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="10"
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
					<br />
				</form>
				<br />
				<div>
					<em className="navigate" onClick={this.buttonClicked}>
						Add Player
					</em>

					<NavLink
						className="navigate"
						onClick={(event) => this.createObjects(event)}
						to={
							'/tournamentpage/' +
							(this.tournamentIDs[0] + 1) +
							'/' +
							(this.tournamentIDs[0] + 1)
						}
						type="button"
					>
						Create Torunament
					</NavLink>
				</div>
				<br />
				<div className="name">{settings.name}</div>
				<br />
				<div className="scrollPlayer">
					{/* Creates a list of all the players signed up for the tournament */}

					{this.teams.map((team, i) => (
						<div className="small" key={i} style={{ float: 'left' }}>
							{/*Gives each player a delete button with a unique ID*/}

							<button
								className="x"
								type="button"
								id={i}
								onClick={(i) => this.confirm(i, this.teams)}
							>
								x
							</button>
							<em key={1}>
								Name: {team[1][0]}, {team[1][1]}{' '}
								<img
									src={'./images/trophies.png'}
									height={'25px'}
									width={'25px'}
								></img>
							</em>
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
			'Are you sure you want to delete "' + deleteTeam[deleteId.target.id][1][0] + '"';
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

	//checks if form is filled out correctly, if it is it pushes the player into an array
	buttonClicked() {
		if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1]]);

		this.name1 = '';
		this.trophies1 = '';
	}
	//creates the tournament and send it for display
	createObjects(event) {
		console.log(settings.gamemode.substring(0, 3));
		//checks if a tournament is wallid, enough players and what gamemode is chosen earlier
		if (this.teams.length > 1 && settings.gamemode.substring(0, 3) == '1v1') {
			this.teamObj = [];
			this.teamID = parseInt(this.teamIDs[0]);
			for (const i of this.teams) {
				this.teamID++;
				let aTeam = new Team(i[1][0], this.teamID, this.tournamentIDs[0] + 1);
				aTeam.addMember(
					new TeamMember(i[1][0], parseInt(i[1][1]), aTeam.id, this.tournamentIDs[0] + 1)
				);
				this.teamObj.push(aTeam);
			}
			tournamentplayer = [
				new Torunament(settings.name, this.tournamentIDs[0] + 1, this.teamObj, settings),
				new Date(),
			];
		} //Makes the 2v2 autogenerated teams
		else if (
			this.teams.length > 3 &&
			(settings.gamemode == '2v2 Generated teams' ||
				settings.gamemode == '2v2 Double Elixir - Generated teams') &&
			this.teams.length % 2 == 0
		) {
			this.teams.sort((a, b) => a[1][1] - b[1][1]);
			let numb = this.teams.length / 2;
			for (let i = 0; i < numb; i++) {
				this.teams[i][0] = 'team ' + (i + 1);
				console.log(this.teams[this.teams.length - 1][1]);
				this.teams[i].push(this.teams[this.teams.length - 1][1]);
				this.teams.pop();
			}
			console.log(this.teams);
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
			tournamentplayer = [
				new Torunament(settings.name, this.tournamentIDs[0] + 1, this.teamObj, settings),
				new Date(),
			];
		} else {
			this.warning =
				settings.gamemode.length == 0
					? 'OBS! You reloaded the page and have to go back a step and create a new tournament'
					: 'Not enough players';
			document.getElementById('warning').style.visibility = 'visible';
			setTimeout(() => {
				warning.style.visibility = 'hidden';
			}, 1500);
			event.preventDefault();
		}
	}
	//database calls for making ids
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
