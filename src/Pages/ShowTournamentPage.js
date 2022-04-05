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
					width={document.documentElement.clientWidth}
					style={{ zIndex: '-1', position: 'absolute' }}
				></canvas>

				<div className="infon">{this.tournamentObject.name}</div>
				<div className="infot">{this.tournamentObject.generalSettings.gamemode}</div>
				<div>
					<em className="login" onClick={this.save} type="button">
						Save
					</em>
					<em className="login" onClick={this.tegn} type="button">
						tegn {this.test(this.tournamentObject.numberOfRounds)}
					</em>
				</div>
				<div className="Grid" id="grid">
					{this.tournamentObject.rounds.map((round) => (
						<div>
							<div
								key={round.roundNumber}
								id={round.roundNumber}
								// style={{
								// 	float: 'left' }
								// }
							>
								Round {round.roundNumber + 1}:
								<div className="Grid-cell" style={{ height: this.length * 150 }}>
									{round.roundNumber == 0 ? (
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
												height: 140 * 2 ** round.roundNumber + 'px',
												width: '400px',
											}}
										>
											<div key={match.matchNumber}>
												<div key={0} style={{ fontSize: '25px' }}>
													<NavLink
														className="loginsmall"
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
											{/* {round.roundNumber == 0 ? (
												<em></em>
											) : (
												<div style={{ height: '70px' }}></div>
											)} */}
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				{this.tournamentObject.generalSettings.type == 'roundrobin' ? (
					<div id="scoreBoard">
						<table className="table">
							{this.tournamentObject.teams.map((member) => (
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
		let tileggY = 0;
		console.log(this.length);
		for (let i = 0; i < this.length / 2; i++) {
			let c = document.getElementById('canvas');
			var ctx = c.getContext('2d');
			ctx.beginPath();
			ctx.moveTo(410, 170 + tileggY);
			ctx.lineTo(510, 170 + tileggY);
			ctx.moveTo(410, 340 + tileggY);
			ctx.lineTo(510, 340 + tileggY);
			ctx.lineTo(510, 170 + tileggY);
			ctx.moveTo(510, 255 + tileggY);
			ctx.lineTo(580, 255 + tileggY);
			ctx.lineWidth = 10;
			ctx.stroke();
			tileggY = tileggY + 280;
			console.log();
		}
	}
	test(e) {
		let out = 0;
		hoyde = [0];
		for (let i = 0; i < e; i++) {
			out += 70 * Math.pow(2, i);
			hoyde.push(out);
		}
		console.log(hoyde);

		return out;
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
}
