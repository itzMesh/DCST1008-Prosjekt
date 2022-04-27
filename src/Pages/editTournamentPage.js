import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';

//this class is where you update the score for each match
export class EditTournamentPage extends Component {
	tournamentObject = this.getTournament();
	matchInds = [this.props.match.params.Match][0].split(',');
	match = null;
	score1 = 0;
	score2 = 0;
	regex = '[1-9][0-9]*';

	render() {
		if (this.tournamentObject.generalSettings.gamemode[4] == 'D') {
			document.body.style.backgroundImage = 'url(images/purple.png)';
		}
		if (!(this.tournamentObject && this.match)) return null;

		return (
			<div style={{ paddingTop: '10%' }}>
				<form ref={(instance) => (this.form = instance)}>
					<em className="text">
						<em>{this.match.teams[0].name} Score: </em>
						<input
							className="input"
							type="number"
							min={0}
							value={this.score1}
							pattern={this.regex}
							onInput={(event) => (this.score1 = event.currentTarget.value)}
							style={{ width: '40px' }}
						/>
					</em>
					<br></br>
					<em className="text">
						<em>{this.match.teams[1].name} Score: </em>
						<input
							className="input"
							type="number"
							pattern={this.regex}
							min={0}
							value={this.score2}
							onChange={(event) => {
								this.score2 = event.currentTarget.value;
							}}
							style={{ width: '40px' }}
						/>
					</em>
				</form>
				<br></br>
				<NavLink
					className="navigate"
					onClick={(event) => this.save(event)}
					to={
						'/tournamentPage/' +
						this.tournamentObject.tournamentID +
						'/' +
						this.tournamentObject.tournamentID
					}
				>
					Update score
				</NavLink>
			</div>
		);
	}
	//saves the information that is in the input fields throw a method from match.js
	save(event) {
		if (!this.form.reportValidity(event)) {
			event.preventDefault();
			return;
		}
		this.match.updateScore(this.score1, this.score2);
	}
	//pull the right tournament object depending on wich class createt it
	getTournament() {
		let tournamentp =
			tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
		let tournamentObject =
			tournamentp[1] > tournamentPageObj[1] ? tournamentp[0] : tournamentPageObj[0];
		return tournamentObject;
	}

	mounted() {
		document.body.style.backgroundImage = 'url(images/blur.png)';

		if (!this.tournamentObject) return null;

		this.match = this.tournamentObject.rounds[this.matchInds[0]].matches[this.matchInds[1]];
		this.score1 = this.match.results.length != 2 ? 0 : this.match.results[0];
		this.score2 = this.match.results.length != 2 ? 0 : this.match.results[1];
	}
}
