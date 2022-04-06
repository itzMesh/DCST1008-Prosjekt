import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';
import { updateDatabase } from '../Classes/pushDatabase';
import { template } from '@babel/core';
import { run } from '@babel/core/lib/transformation';

let tournamentID = 0;
let hoyde = [];
export class ShowTournamentPage extends Component {
	loaded = false;
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentPageObj[1] ? this.tournamentp[0] : tournamentPageObj[0];
	length = this.tournamentObject.rounds[0].matches.length;
	render() {
		if (!this.tournamentObject) return null;

		return (
			<div className="small">
				<canvas
					id="canvas"
					height={this.length * 150 + 186}
					width={this.tournamentObject.numberOfRounds * 500}
					style={{ zIndex: '-1', position: 'absolute' }}
				>
					{(this.loaded = true)}
				</canvas>

				<div className="infon">{this.tournamentObject.name}</div>
				<div className="infot">{this.tournamentObject.generalSettings.gamemode}</div>

				<div>
					<br />
					<em className="save" onClick={this.save} type="button">
						Save {this.brackets(this.tournamentObject.numberOfRounds)}
					</em>
				</div>
				<div className="grid" id="grid">
					{this.tournamentObject.rounds.map((round) => (
						<div onLoad={() => this.tegn(round.matches.length / 2)}>
							<div key={round.roundNumber} id={round.roundNumber}>
								Round {round.roundNumber + 1}:
								<div className="grid-cell" style={{ height: this.length * 150 }}>
									{round.roundNumber == 0 ||
									this.tournamentObject.generalSettings.type != 'bracket' ? (
										<em></em>
									) : (
										<div
											style={{
												height: hoyde[round.roundNumber] + 'px',
											}}
										></div>
									)}
									{round.matches.map((match) => (
										<div
											style={{
												height:
													this.tournamentObject.generalSettings.type ==
													'bracket'
														? 140 * 2 ** round.roundNumber + 'px'
														: '140px',
												width:
													this.tournamentObject.generalSettings.type ==
													'bracket'
														? '400px'
														: '300px',
											}}
										>
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
														(team) =>
															team.constructor.name != 'ShadowTeam'
													)
													.map((team, i) => (
														<div key={team.id}>
															<em key={0}>
																<b
																	style={{
																		color: 'white',
																	}}
																>
																	{match.results[i]}{' '}
																</b>
																<b>{team.name}</b>
																{team.teamMembers.length == 1 ? (
																	<em></em>
																) : (
																	<em>
																		<b>:</b>
																		{team.teamMembers.map(
																			(member) => (
																				<em
																					key={
																						member.name
																					}
																				>
																					{'"' +
																						member.name +
																						'" '}
																				</em>
																			)
																		)}
																	</em>
																)}
															</em>
														</div>
													))}
											</div>{' '}
											<br />
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				<div id="winner"></div>
				{this.tournamentObject.generalSettings.type == 'roundrobin' ? (
					<div id="scoreBoard">
						<table>
							{this.tournamentObject.teams
								.sort(
									(a, b) =>
										b.score.reduce((sum, e) => sum + e, 0) -
										a.score.reduce((sum, e) => sum + e, 0)
								)
								.map((member) => (
									<tr>
										<td>{member.name}</td>
										<td>{member.score.reduce((sum, e) => sum + e, 0)}</td>
									</tr>
								))}
						</table>
					</div>
				) : (
					<em></em>
				)}
			</div>
		);
	}

	tegn() {
		let startX = 410;
		let startY = 170;
		console.log(this.tournamentObject.rounds);
		for (let j = 0; j < this.tournamentObject.rounds.length - 1; j++) {
			let drawX = startX + j * 540;
			let drawY = startY + hoyde[j];
			let tileggY = 0;
			for (let i = 0; i < this.length / 2 ** (j + 1); i++) {
				let c = document.getElementById('canvas');
				var ctx = c.getContext('2d');
				ctx.beginPath();
				ctx.moveTo(drawX, drawY + tileggY);
				ctx.lineTo(drawX + 100, drawY + tileggY);
				ctx.moveTo(drawX, drawY + 140 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 100, drawY + 140 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 100, drawY + tileggY);
				ctx.moveTo(drawX + 100, drawY + 70 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 170, drawY + 70 * 2 ** j + tileggY);
				ctx.strokeStyle = '#fdf913';
				ctx.lineWidth = 5;
				ctx.stroke();
				tileggY = tileggY + 280 * 2 ** j;
			}
		}
	}
	brackets(e) {
		let out = 0;
		hoyde = [0];
		for (let i = 0; i < e; i++) {
			out += 70 * Math.pow(2, i);
			hoyde.push(out);
		}
		console.log(hoyde);
	}
	save() {
		function delTournament(inn) {
			console.log(inn, '1');
			console.log(tournamentID);
			return new Promise((resolve) => {
				updateDatabase.deleteTournament(tournamentID, () => resolve(inn));
			});
		}

		function delGameMatch(inn) {
			console.log(inn, '2');

			return new Promise((resolve) => {
				updateDatabase.deleteGameMatch(tournamentID, () => resolve(inn));
			});
		}

		function delTeams(inn) {
			console.log(inn, '3');

			return new Promise((resolve) => {
				updateDatabase.deleteTeams(tournamentID, () => resolve(inn));
			});
		}

		function delTeamMember(inn) {
			console.log(inn), '4';

			return new Promise((resolve) => {
				updateDatabase.deleteTeamMember(tournamentID, () => resolve(inn));
			});
		}

		function addsTournament(inn) {
			console.log(inn, '5');
			return new Promise((resolve) => {
				updateDatabase.addTournament(inn[0], () => {
					resolve(inn);
				});
			});
		}

		function addsGameMatch(inn) {
			return new Promise((resolve) => {
				for (const round of inn[0].rounds) {
					for (const matchInfo of round.matches) {
						updateDatabase.addGameMatch(matchInfo, () => {
							console.log('lagt til good gamematch');
						});
					}
				}
				resolve(inn);
			});
		}

		function addsTeam(inn) {
			return new Promise((resolve) => {
				for (const team of inn[0].teams) {
					updateDatabase.addTeam(team, () => {
						console.log('lagt til team');
					});
				}
				resolve(inn);
			});
		}

		function addsTeamMember(inn) {
			return new Promise((resolve) => {
				for (const teamMembers of inn[0].teams.filter(
					(team) => team.constructor.name != 'ShadowTeam'
				)) {
					for (const teamMemberInfo of teamMembers.teamMembers) {
						updateDatabase.addTeamMember(teamMemberInfo, () => {
							console.log('lagt til teamMembers');
						});
					}
				}
				resolve(inn);
			});
		}

		async function kjør(inn) {
			try {
				console.log(inn[0]);
				let a = await delTournament(inn);
				let b = await delGameMatch(a);
				let c = await delTeams(b);
				let d = await delTeamMember(c);
				let e = await addsTournament(d);
				let f = await addsGameMatch(e);
				let g = await addsTeam(f);
				let h = await addsTeamMember(g);
				return h;
			} catch (error) {
				console.error(error);
			}
		}

		(async () => {
			tournamentID = this.tournamentObject.TorunamentId;
			console.log(this.tournamentObject.TorunamentId, 'se her');
			let message = await kjør([this.tournamentObject]);
			console.log(message);
		})();
	}
	mounted() {
		if (this.loaded && this.tournamentObject.generalSettings.type == 'bracket') {
			this.tegn();
		}

		if (this.tournamentObject.winner != null) {
			document.getElementById('winner').innerHTML =
				'The winner of the tournament is: ' + this.tournamentObject.winner.name;
		}
	}
}
