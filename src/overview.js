import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

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
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournaments = results;
		});
	}
}

export class New extends Component {
	render() {
		return (
			<div>
				<br />
				Select tournament type
				<select
					value={this.name}
					onChange={(event) => (this.name = event.currentTarget.value)}
				>
					<option value="bracket">Bracket</option>
					<option value="roundrobin">Round robin</option>
				</select>
				<br />
				<br />
				Select match type
				<select
					value={this.name}
					onChange={(event) => (this.name = event.currentTarget.value)}
				>
					<option value="">1v1</option>
					<option value="">2v2 - Generated teams</option>
					<option value="">2v2 - Custom Teams</option>
					<option value="">1v1 Double Elixir</option>
					<option value="">2v2 - Double Elixir</option>
					<option value="">2v2 - Double Elixir</option>
				</select>
				<br />
				<br />
				Amount of rounds
				<select
					value={this.name}
					onChange={(event) => (this.name = event.currentTarget.value)}
				>
					<option value="bracket">Best of 1</option>
					<option value="roundrobin">Best of 3</option>
				</select>
				<br />
				<br />
				<NavLink to="/bracket">
					<button type="button">Create tournament</button>
				</NavLink>
			</div>
		);
	}
}

export class Overview extends Component {
	render() {
		return <div>Overview</div>;
	}
}
