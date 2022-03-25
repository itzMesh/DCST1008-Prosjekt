import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from '../mysql-pool';
import { NavLink } from 'react-router-dom';
import Torunament from '../Classes/tournament';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import { settings } from './newTournament';

export let tournamentplayer = [null, new Date()];

export class AddSinglePlayer extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	teams = [];
	form = null;
	link = '';
	tournamentcreator = [];
	tournaments = [];

	render() {
		if (this.tournaments.length == 0) return null;

		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
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
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>
					<br />
					<br />
				</form>
				{/* <NavLink className="login" onClick={this.buttonClicked}>
						Add team
				</NavLink> */}
				
				
				<em className="login" type="button" onClick={this.buttonClicked}>
					Add team
				</em>

				<button className="login" type="button" onClick={() => this.createObjects()}>
					Create Tournament
				</button>

				{this.tournamentcreator.map(() => (
					<NavLink to={this.link}>
						<button
							className="login"
							onClick={() => this.createObjects()}
							type="button"
						>
							Show Torunament
						</button>
					</NavLink>
				))}
				<br />
				<div>
					{this.teams.map((team, i) => (
						<div className="small" key={i} style={{ float: 'left' }}>
							<em key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</em>

							<button
								className="login"
								type="button"
								id={i}
								onClick={(i) => this.teams.splice(i.target.id, 1)}
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

	mounted() {
		pool.query('SELECT TournamentID FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournaments = results;
			this.tournaments = this.tournaments.map((Tournament) => Tournament.TournamentID);
			this.tournaments.sort((a, b) => b - a);
			console.log(this.tournaments);
		});
	}

	buttonClicked() {
		// if (!this.form.reportValidity()) return;

		this.teams.push([this.team, [this.name1, this.trophies1]]);

		this.name1 = '';
		this.trophies1 = '';
	}

	createObjects() {
		if (this.teams.length > 1) {
			this.teamObj = [];
			console.log(this.teams[0]);
			for (const i of this.teams) {
				let aTeam = new Team(i[1][0], 0);
				aTeam.addMember(new TeamMember(i[1][0], parseInt(i[1][1])));
				this.teamObj.push(aTeam);
			}
			tournamentplayer = [
				new Torunament(settings.name, this.tournaments[0] + 1, this.teamObj),
				new Date(),
			];
			this.tournamentcreator[0] = true;
			this.link =
				'/tournamentpage/' +
				tournamentplayer[0].TournamentID +
				'/' +
				tournamentplayer[0].TournamentID;
		}
	}
}
