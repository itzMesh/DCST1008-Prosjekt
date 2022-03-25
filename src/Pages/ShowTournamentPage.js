import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';

export class ShowTournamentPage extends Component {
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentPageObj[1] ? this.tournamentp[0] : tournamentPageObj[0];

	render() {
		if (!this.tournamentObject) return null;

		console.log(tournamentPageObj);

		return (
			<div className="small">
				<br />
				<div>Tester</div>
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
												<NavLink
													className="login"
													to={
														'/matches/edit/' +
														round.roundNumber +
														',' +
														match.ind
													}
												>
													Match {match.matchNumber}
												</NavLink>
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
}
