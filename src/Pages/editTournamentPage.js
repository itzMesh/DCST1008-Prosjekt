import * as React from 'react';
import { Component } from 'react-simplified';
import { editService } from '../Classes/editService';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';

export class EditTournamentPage extends Component {
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentPageObj[1] ? this.tournamentp[0] : tournamentPageObj[0];
	matchInds = [this.props.match.params.Match][0].split(',');
	match = null;
	score1 = 0;
	score2 = 0;

	render() {
		if (!(this.tournamentObject && this.match)) return null;
		console.log(this.tournamentObject);

		return (
			<div>
				<ul>
					<li>
						Completed:{' '}
						<input
							type="text"
							value={this.match.Completed}
							onChange={(event) => (this.match.Completed = event.currentTarget.value)}
						/>
					</li>
					<li>
						{this.match.teams[0].name} Score:{' '}
						<input
							type="number"
							value={this.score1}
							onChange={(event) => (this.score1 = event.currentTarget.value)}
						/>
					</li>
					<li>
						{this.match.teams[1].name} Score:{' '}
						<input
							type="number"
							value={this.score2}
							onChange={(event) => (this.score2 = event.currentTarget.value)}
						/>
					</li>
				</ul>
				<button type="button" onClick={this.save}>
					Save
				</button>
				<NavLink
					to={
						'/tournamentPage/' +
						this.tournamentObject.TorunamentId +
						'/' +
						this.tournamentObject.TorunamentId
					}
				>
					<button type="button">Send to tournament</button>
				</NavLink>
			</div>
		);
	}

	mounted() {
		if (!this.tournamentObject) return null;

		this.match = this.tournamentObject.rounds[this.matchInds[0]].matches[this.matchInds[1]];
		console.log(this.match);
		this.score1 = this.match.results.length != 2 ? 0 : this.match.results[0];
		this.score2 = this.match.results.length != 2 ? 0 : this.match.results[1];
	}

	save() {
		this.match.updateScore(this.score1, this.score2);
	}
}
