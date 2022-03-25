import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export let settings = { name: '', type: '', gamemode: '' };

export class NewTournament extends Component {
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
		settings.gamemode = this.gamemode;
		settings.type = this.type;
		console.log(settings);
	}
}
