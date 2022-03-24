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
import { tournament } from './TournamentPage';

export class ShowTournamentPage extends Component {
	tournamentObject = tournament;

	render() {
		if (!this.tournamentObject) return null;

		console.log(this.tournamentObject);
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
											<div key={0}>Match {match.matchNumber}</div>
											{match.teams
												.filter(
													(team) => team.constructor.name != 'ShadowTeam'
												)
												.map((team) => (
													<div key={team.id}>
														<em key={0}>
															{team.name}
															{team.teamMembers.map((member) => (
																<li key={member.name}>
																	{member.name}
																</li>
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
