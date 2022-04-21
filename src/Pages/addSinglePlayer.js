import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from '../mysql-pool';
import { NavLink } from 'react-router-dom';
import Torunament from '../Classes/tournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import { settings } from './newTournament';
import { body } from 'express-validator';

let deleteId;
let deleteTeam;

export let tournamentplayer = [null, new Date()];
export class AddSinglePlayer extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	teams = [];
	form = null;
	link = '';
	tournamentIDs = [];
	teamIDs = [];
	teamID = 0;

	render() {
		if (this.tournamentIDs.length == 0) return null;
		// if (settings.gamemode[3] == 'D') {
		// 	body.style.backgroundColor = 'white';
		// }
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
					<br /> <em className="text">Player</em>
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

				<div>
					<em className="login" onClick={this.buttonClicked}>
						Add Player
					</em>

					<NavLink
						className="login"
						onClick={(event) => this.createObjects(event)}
						to={
							'/tournamentpage/' +
							(this.tournamentIDs.length == 0 ? 1 : this.tournamentIDs[0] + 1) +
							'/' +
							(this.tournamentIDs.length == 0 ? 1 : this.tournamentIDs[0] + 1)
						}
						type="button"
					>
						Create Torunament
					</NavLink>
				</div>
				<br />
				<div className="infon">{settings.name}</div>
				<br />
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
			</div>
		);
	}
	confirm(i, teams) {
		deleteId = i;
		deleteTeam = teams;
		document.getElementById('confirmT').style.visibility = 'visible';

		document.getElementById('teamName').innerText =
			'Are you sure you want to delete "' + deleteTeam[deleteId.target.id][1][0] + '"';
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
		});
		pool.query('SELECT TeamID FROM Team', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.teamIDs = results;
			this.teamIDs = this.teamIDs.map((Team) => Team.TeamID);
			this.teamIDs.sort((a, b) => b - a);
		});
	}

	buttonClicked() {
		if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1]]);

		this.name1 = '';
		this.trophies1 = '';
	}

	createObjects(event) {
		if (this.teams.length > 1 && settings.gamemode.substring(0, 3) == '1v1') {
			this.teamObj = [];
			this.teamID = parseInt(this.teamIDs[0]);
			for (const i of this.teams) {
				this.teamID++;
				let aTeam = new Team(i[1][0], this.teamID, this.tournamentIDs[0] + 1);
				aTeam.addMember(
					new TeamMember(
						i[1][0],
						parseInt(i[1][1]),
						aTeam.id,
						this.tournamentIDs.length == 0 ? 1 : this.tournamentIDs[0] + 1
					)
				);
				this.teamObj.push(aTeam);
			}
			tournamentplayer = [
				new Torunament(
					settings.name,
					this.tournamentIDs.length == 0 ? 1 : this.tournamentIDs[0] + 1,
					this.teamObj,
					settings
				),
				new Date(),
			];
		} else {
			console.log('fungerer dette');
			event.preventDefault();
		}
	}
}
