import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import GeneralSettings from '../Classes/GeneralSettings';

export let settings = new GeneralSettings('', '', '');
//this class creates the page and store the imformatinon about new tournaments
export class NewTournament extends Component {
	settings = settings;
	tourname = '';
	type = 'bracket';
	gamemode = '1v1,0';

	render() {
		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<br />
					<div>
						<em className="text">Tournament name</em>
						<input
							className="input"
							value={this.tourname}
							onChange={(event) => (this.tourname = event.currentTarget.value)}
							required
						/>
						<br />
						<br />
						<em className="text">Select tournament type</em>
						<select
							className="input"
							value={this.type}
							onChange={(event) => (this.type = event.currentTarget.value)}
							placeholder="0"
							required
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
							required
						>
							{/* <option value="" disabled selected hidden>
							Select your option
						</option> */}
							<option value="1v1,0">1v1</option>
							<option value="2v2 Generated teams,0">2v2 - Generated teams</option>
							<option value="2v2 Custom Teams,1">2v2 - Custom Teams</option>
							<option value="1v1 Double Elixir,0">1v1 - Double Elixir</option>
							<option value="2v2 Double Elixir - Generated teams,0">
								2v2 - Double Elixir - Generated teams
							</option>
							<option value="2v2 Double Elixir - Custom Teams,1">
								2v2 - Double Elixir - Custom Teams
							</option>
						</select>
					</div>
					<br />
					<br />
				</form>
				<NavLink
					onClick={this.setSettings}
					className="navigate"
					to={'/players/' + this.gamemode.split(',')[1]}
				>
					Setup tournament
				</NavLink>
			</div>
		);
	}
	//checks if the input fileds are vallid and if they are set the information in settings,
	//settings then get transferd to addSingelPlayer or addTwoPlayersTeams where more information is added
	setSettings(event) {
		if (!this.form.reportValidity()) {
			event.preventDefault();
		}

		settings.name = this.tourname;
		settings.gamemode = this.gamemode.split(',')[0];
		settings.type = this.type;
	}
	mounted() {
		document.body.style.backgroundImage = 'url(images/blur.png)';
	}
}
