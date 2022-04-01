import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export let settings = { name: '', type: '', gamemode: '' };

export class NewTournament extends Component {
	tourname = '';
	type = 'bracket';
	gamemode = '1v1,0';

	render() {
		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<em className="text">Tournament name</em>
					<input
						className="input"
						value={this.tourname}
						onChange={(event) => (this.tourname = event.currentTarget.value)}
					/>
					<br />
					<br />
					<em className="text">Select tournament type</em>
					<select
						className="input"
						value={this.type}
						onChange={(event) => (this.type = event.currentTarget.value)}
					>
						<option value="bracket">Bracket</option>
						<option value="roundrobin">Round robin</option>
					</select>
					<br />
					<br />
					<em className="text">Select match type</em>
					<select
						className="input"
						value={this.gamemode}
						onChange={(event) => (this.gamemode = event.currentTarget.value)}
					>
						<option value="1v1,0">1v1</option>
						<option disabled value="2v2G,0">
							2v2 - Generated teams
						</option>
						<option value="2v2C,1">2v2 - Custom Teams</option>
						<option disabled value="1v1De,0">
							1v1 Double Elixir
						</option>
						<option disabled value="2v2GDe,0">
							2v2 - Double Elixir - Generated teams
						</option>
						<option disabled value="2v2GCe,1">
							2v2 - Double Elixir - Custom Teams
						</option>
					</select>
					<br />
					<br />
				</form>
				<NavLink
					onClick={this.setSettings}
					className="login"
					to={'/players/' + this.gamemode.split(',')[1]}
				>
					Setup tournament
				</NavLink>
			</div>
		);
	}

	setSettings() {
		// if (!this.form.reportValidity()) return;

		settings.name = this.tourname;
		settings.gamemode = this.gamemode.split(',')[0];
		settings.type = this.type;
	}
}
