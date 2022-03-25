import * as React from 'react';
import { Component } from 'react-simplified';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';
import { updateDatabase } from '../Classes/pushDatabase';
export class ShowTournamentPage extends Component {
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentPageObj[1] ? this.tournamentp[0] : tournamentPageObj[0];

	render() {
		if (!this.tournamentObject) return null;

		console.log(this.tournamentObject);
		console.log(this.tournamentObject.TorunamentId, 'se her');
		return (
			<div>
				<div>
					<button type="button" onClick={this.save}>
						Save
					</button>
				</div>
				{this.tournamentObject.rounds.map((round) => (
					<div>
						<div
							key={round.roundNumber}
							id={round.roundNumber}
							style={{ float: 'left' }}
						>
							Round {round.roundNumber + 1}:
							<ul key={round.roundNumber + 'm'}>
								{round.matches.map((match) => (
									<div>
										<div key={match.matchNumber}>
											<div key={0} style={{ fontSize: '25px' }}>
												Match {match.matchNumber}
											</div>
											{match.teams
												.filter(
													(team) => team.constructor.name != 'ShadowTeam'
												)
												.map((team) => (
													<div key={team.id}>
														<em key={0}>
															<b>{team.name}: </b>
															{team.teamMembers.length == 1 ? (
																<em></em>
															) : (
																team.teamMembers.map((member) => (
																	<em key={member.name}>
																		{'"' + member.name + '" '}
																	</em>
																))
															)}
														</em>
													</div>
												))}
										</div>{' '}
										<br />
									</div>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		);
	}

	save() {
		let match = [];
		let TournamentID = this.tournamentObject.TorunamentId;
		updateDatabase.deleteTournament(this.props.match.params.TournamentID, () =>
			console.log('slettet good tournament')
		);
		updateDatabase.addTournament(this.tournamentObject, () => {
			console.log('lagt til good Tournament');
		});
		updateDatabase.deleteGameMatch(this.props.match.params.TournamentID, () =>
			console.log('slettet good GameMatch')
		);
		for (const round of this.tournamentObject.rounds) {
			for (const match of round.matches) {
				console.log(
					match.completed,
					match.ind,
					match.results,
					match.round.roundNumber,
					match.teams[0].id,
					match.teams[1].id,
					match.round.tournament.TorunamentId
				);
			}
		}
		updateDatabase.addGameMatch(this.tournamentObject, () => {
			console.log('lagt til good Tournament');
		});
	}
}
