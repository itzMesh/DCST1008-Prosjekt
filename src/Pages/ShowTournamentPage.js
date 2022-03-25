import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, withRouter } from 'react-router-dom';
import { pool } from '../mysql-pool';
import { editService } from '../Classes/editTournamentPage';
import Torunament from '../Classes/Tournament';
import TeamMember from '../Classes/TeamMember';
import Team from '../Classes/Team';
import Match from '../Classes/Match';
import { tournamentplayers } from '../players';
import { tournamentpage } from './TournamentPage';
import { tournamentplayer } from '../player';

export class ShowTournamentPage extends Component {
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentpage[1] ? this.tournamentp[0] : tournamentpage[0];

	render() {
		if (!this.tournamentObject) return null;

		return (
			<div>
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
															{team.teamMembers.map((member) => (
																<em key={member.name}>
																	{'"' + member.name + '" '}
																</em>
															))}
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
