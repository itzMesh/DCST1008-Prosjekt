import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from '../mysql-pool';
import { NavLink } from 'react-router-dom';
import { settings } from './newTournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import Torunament from '../Classes/tournament';

export let tournamentplayers = [null, new Date()];
let deleteId;
let deleteTeam;
export class AddTwoPlayerTeams extends Component {
	team = 'Best team';
	name1 = 'Jo';
	trophies1 = '2000';
	name2 = 'Martin';
	trophies2 = '69';
	teams = [];
	form = null;
	tournamentIDs = [];
	teamObj = [];
	link = '';
	tournamentcreator = [];
	teamIDs = [];
	teamID = 0;

	render() {
		if (this.tournamentIDs.length == 0) return null;

		return (
			<div>
				<div className="confirmT" id="confirmT">
					<p id="teamName"></p>
					<button className="login" onClick={() => this.delete()}>
						Yes
					</button>
					<button className="login" onClick={() => this.nodelete()}>
						No
					</button>
				</div>
				<form ref={(instance) => (this.form = instance)}>
					<br /> <em className="text">Team</em>
					<input
						className="input"
						type="text"
						value={this.team}
						placeholder="Team name"
						size="25x"
						onChange={(event) => (this.team = event.currentTarget.value)}
						required
					/>
					<br /> <em className="text">Player 1</em>
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
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>
					<br />
					<em className="text">Player 2</em>
					<input
						className="input"
						type="text"
						value={this.name2}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name2 = event.currentTarget.value)}
						required
					/>
					<input
						className="input"
						type="number"
						value={this.trophies2}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies2 = event.currentTarget.value)}
						required
					/>
					<br />
					<br />
				</form>
				<em className="login" type="button" onClick={this.buttonClicked}>
					Add team
				</em>

				<em className="login" onClick={() => this.createObjects()} type="button">
					Create Tournament
				</em>
				{this.tournamentcreator.map(() => (
					<NavLink
						to={this.link}
						className="login"
						onClick={() => this.createObjects()}
						type="button"
					>
						Show Torunament
					</NavLink>
				))}

				<br />
				<div>
					{this.teams.map((team, i) => (
						<div className="small" key={i} style={{ float: 'left' }}>
							<div key={0}>Team: {team[0]}</div>
							<div key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</div>
							<div key={2}>
								Name: {team[2][0]} Trophies {team[2][1]}
							</div>
							<button
								className="login"
								type="button"
								id={i}
								onClick={(i) => this.confirm(i, this.teams)}
							>
								x
							</button>
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
		console.log(deleteTeam[deleteId.target.id][0]);

		document.getElementById('confirmT').style.visibility = 'visible';

		document.getElementById('teamName').innerText =
			'Are you sure you want to delete ' + deleteTeam[deleteId.target.id][0];
	}
	nodelete() {
		document.getElementById('confirmT').style.visibility = 'hidden';
	}
	delete() {
		deleteTeam.splice(deleteId.target.id, 1);
		document.getElementById('confirmT').style.visibility = 'hidden';
	}
	mounted() {
		pool.query('SELECT TournamentID FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournamentIDs = results;
			this.tournamentIDs = this.tournamentIDs.map((Tournament) => Tournament.TournamentID);
			this.tournamentIDs.sort((a, b) => b - a);
			console.log(this.tournamentIDs);
		});
		pool.query('SELECT TeamID FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teamIDs = results;
			this.teamIDs = this.teamIDs.map((Team) => Team.TeamID);
			this.teamIDs.sort((a, b) => b - a);
		});
	}

	createObjects() {
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
			this.tournamentcreator[0] = true;
			this.link =
				'/tournamentpage/' +
				tournamentplayers[0].TournamentID +
				'/' +
				tournamentplayers[0].TournamentID;
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
}
