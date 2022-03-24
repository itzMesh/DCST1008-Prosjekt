import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

export let settings = { name: '', bestOf: '', type: '', gamemode: '' };

export class Choose extends Component {
	tournaments = [];
	render() {
		return (
			<div
				style={{
					backgroundColor: 'lightgray',
					width: '100%',
					height: '100%',
					fontSize: '40px',
				}}
			>
				<br /> Overview of Tournaments <br />
				{this.tournaments.map((tournament) => (
					<li key={tournament.TournamentID}>
						<NavLink to={'/tournamentpage/' + tournament.TournamentID}>
							{tournament.TournamentName}
						</NavLink>
					</li>
				))}
				<NavLink to="/new">New tournament</NavLink>
			</div>
		);
	}
	mounted() {
		pool.query('SELECT * FROM Tournament', (error, results) => {
			if (error) return console.error(error); 

			this.tournaments = results;
		});
	}
}

export class New extends Component {
	tourname = '';
	bestof = '';
	type = '';
	gamemode = 0;

	render() {
		return (
			<div>
				<br />
				Tournament name
				<input
					value={this.tourname}
					onChange={(event) => (this.tourname = event.currentTarget.value)}
				/>
				<br />
				<br />
				Select tournament type
				<select
					value={this.type}
					onChange={(event) => (this.type = event.currentTarget.value)}
				>
					<option value="bracket">Bracket</option>
					<option value="roundrobin">Round robin</option>
				</select>
				<br />
				<br />
				Select match type
				<select
					value={this.gamemode}
					onChange={(event) => (this.gamemode = event.currentTarget.value)}
				>
					<option value="0">1v1</option>
					<option value="0">2v2 - Generated teams</option>
					<option value="1">2v2 - Custom Teams</option>
					<option value="0">1v1 Double Elixir</option>
					<option value="0">2v2 - Double Elixir - Generated teams</option>
					<option value="1">2v2 - Double Elixir - Custom Teams</option>
				</select>
				<br />
				<br />
				Amount of rounds
				<select
					value={this.bestof}
					onChange={(event) => (this.bestof = event.currentTarget.value)}
				>
					<option value="bracket">Best of 1</option>
					<option value="roundrobin">Best of 3</option>
				</select>
				<br />
				<br />
				<NavLink to={'/players/' + this.gamemode}>
					<button onClick={this.setSettings()} type="button">
						Create tournament
					</button>
				</NavLink>
			</div>
		);
	}

	setSettings() {
		settings.name = this.tourname;
		settings.bestOf = this.bestof;
		settings.gamemode = this.gamemode;
		settings.type = this.type;
		console.log(settings);
	}
}

export class Overview extends Component {
	render() {
		return <div>Overview</div>;
	}
}
