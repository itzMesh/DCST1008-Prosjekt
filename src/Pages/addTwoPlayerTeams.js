import * as React from 'react';
import { Component } from 'react-simplified';
import { pool } from './mysql-pool';
import { NavLink } from 'react-router-dom';
import { settings } from './Pages/overview';
import Team from './Classes/Team';
import TeamMember from './Classes/TeamMember';
import Torunament from './Classes/Tournament';

export let tournamentplayers = [null, new Date()];

export class AddTwoPlayerTeams extends Component {
	team = 'Best team';
	name1 = 'Jo';
	trophies1 = '2000';
	name2 = 'Martin';
	trophies2 = '69';
	teams = [];
	form = null;
	tournaments = [];
	teamObj = [];
	link = '';
	tournamentcreator = [];

	render() {
		if (this.tournaments.length == 0) return null;

		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<input
						type="text"
						value={this.team}
						placeholder="Team name"
						size="25x"
						onChange={(event) => (this.team = event.currentTarget.value)}
						required
					/>
					<br /> Player 1
					<input
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name1 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies1}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>
					<br />
					Player 2
					<input
						type="text"
						value={this.name2}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name2 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies2}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies2 = event.currentTarget.value)}
						required
					/>
					<br />
					<br />
					<button type="button" onClick={this.buttonClicked}>
						Add team
					</button>
				</form>

				<button
					onClick={() => this.createObjects()}
					style={{
						backgroundColor: 'red',
						size: 'large',
						marginLeft: '700px',
						marginTop: '10px',
						height: '40px',
						width: '100px',
					}}
					type="button"
				>
					Create Tournament
				</button>
				{this.tournamentcreator.map(() => (
					<NavLink to={this.link}>
						<button
							onClick={() => this.createObjects()}
							style={{
								backgroundColor: 'red',
								size: 'large',
								marginLeft: '700px',
								marginTop: '50px',
								height: '40px',
								width: '100px',
							}}
							type="button"
						>
							Show Torunament
						</button>
					</NavLink>
				))}

				<br />
				<div>
					{this.teams.map((team, i) => (
						<div key={i} style={{ float: 'left' }}>
							<div key={0}>Team: {team[0]}</div>
							<div key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</div>
							<div key={2}>
								Name: {team[2][0]} Trophies {team[2][1]}
							</div>
							<button
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

	createObjects() {
		if (this.teams.length > 1) {
			this.teamObj = [];
			console.log(this.teams[0]);
			for (const i of this.teams) {
				let aTeam = new Team(i[0], 0);
				aTeam.addMember(new TeamMember(i[1][0], parseInt(i[1][1])));
				aTeam.addMember(new TeamMember(i[2][0], parseInt(i[2][1])));
				this.teamObj.push(aTeam);
			}
			tournamentplayers = [
				new Torunament(settings.name, this.tournaments[0] + 1, this.teamObj),
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
		this.teams.push([this.team, [this.name1, this.trophies1], [this.name2, this.trophies2]]);
		this.team = '';
		this.name1 = '';
		this.trophies1 = '';
		this.name2 = '';
		this.trophies2 = '';
	}
}
