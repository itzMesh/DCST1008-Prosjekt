import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';
import { updateDatabase } from '../Classes/pushDatabase';
let showtime = new Audio('./sound/wiz_deploy_vo_01.ogg');
import { pool } from '../mysql-pool';
import Round from '../Classes/round';

let tournamentID = 0;
let hoyde = [];
let ok = false;

export class ShowTournamentPage extends Component {
	tournamentIDs = [];
	loaded = false;
	tournamentp = tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
	tournamentObject =
		this.tournamentp[1] > tournamentPageObj[1] ? this.tournamentp[0] : tournamentPageObj[0];
	length = this.tournamentObject.rounds[0].matches.length;
	roundsInTournament = [];
	allredyLoaded = false;
	showedConfetti = false;
	render() {
		if (!this.tournamentObject || this.roundsInTournament.length == 0) return null;

		return (
			<div className="small">
				{this.tournamentObject.generalSettings.type == 'roundrobin' ? (
					<div
						id="scoreBoard"
						style={{
							float: 'top',
							position: 'absolute',
							left: this.length * 300 + 100 + 'px',
							top: '250px',
						}}
					>
						<table className="table">
							<thead>
								<tr>
									<th>Player</th>
									<th>Score</th>
								</tr>
							</thead>
							{this.tournamentObject.teams
								.sort(
									(a, b) =>
										b.score.reduce((sum, e) => sum + e, 0) -
										a.score.reduce((sum, e) => sum + e, 0)
								)
								.map((member) => (
									<tbody>
										<tr>
											<td>{member.name}</td>
											<td>{member.score.reduce((sum, e) => sum + e, 0)}</td>
										</tr>
									</tbody>
								))}
						</table>
					</div>
				) : (
					<em></em>
				)}
				{this.tournamentObject.generalSettings.type == 'bracket' ? (
					<canvas
						id="canvas"
						height={this.length * 150 + 186}
						width={this.tournamentObject.numberOfRounds * 500}
						style={{ zIndex: '-1', position: 'absolute' }}
					>
						{(this.loaded = true)}
					</canvas>
				) : (
					<em></em>
				)}

				<div className="infon">{this.tournamentObject.name}</div>
				<div className="infot">{this.tournamentObject.generalSettings.gamemode}</div>

				<div>
					<br />
					<em className="login" onClick={this.updateScore} type="button">
						Save {this.brackets(this.tournamentObject.numberOfRounds)}
					</em>
				</div>
				<div
					className={
						this.tournamentObject.generalSettings.type == 'bracket'
							? 'grid'
							: 'roundGrid'
					}
					id="grid"
				>
					{' '}
					{this.roundsInTournament.map((round) => (
						<div
							style={{
								border:
									this.tournamentObject.generalSettings.type != 'bracket'
										? '#fdf913 3px inset'
										: '',
								marginTop:
									this.tournamentObject.generalSettings.type != 'bracket'
										? '30px'
										: '',
							}}
						>
							<div
								key={round.roundNumber}
								id={round.roundNumber}
								className={
									this.tournamentObject.generalSettings.type == 'bracket'
										? 'grid-cell'
										: 'roundGrid-cell'
								}
							>
								{round.roundNumber == this.tournamentObject.numberOfRounds
									? 'Bronze final'
									: 'Round ' + (round.roundNumber + 1)}
								:
								<div
									style={{
										height:
											this.tournamentObject.generalSettings.type == 'bracket'
												? this.length * 150
												: 'auto',
									}}
								>
									{round.roundNumber == 0 ||
									this.tournamentObject.generalSettings.type != 'bracket' ? (
										<em></em>
									) : (
										<div
											style={{
												height:
													hoyde[
														round.roundNumber ==
														this.tournamentObject.numberOfRounds
															? round.roundNumber - 1
															: round.roundNumber
													] + 'px',
											}}
										></div>
									)}
									{round.matches
										.filter(
											(match) =>
												round.roundNumber != round.numberOfRounds - 1 ||
												match.ind == 0
										)
										.map((match) => (
											<div
												style={{
													height:
														this.tournamentObject.generalSettings
															.type == 'bracket'
															? 140 * 2 ** round.roundNumber + 'px'
															: '140px',
													width:
														this.tournamentObject.generalSettings
															.type == 'bracket'
															? '400px'
															: '300px',
													float:
														this.tournamentObject.generalSettings
															.type == 'bracket'
															? 'none'
															: 'left',
												}}
											>
												<div
													key={match.matchNumber}
													style={{
														height:
															this.tournamentObject.generalSettings
																.type == 'bracket'
																? '100px'
																: '',
														width:
															this.tournamentObject.generalSettings
																.type == 'bracket'
																? '300px'
																: '',
														border:
															this.tournamentObject.generalSettings
																.type == 'bracket'
																? '#fdf913 3px inset'
																: '',
														marginLeft:
															this.tournamentObject.generalSettings
																.type == 'bracket'
																? '50px'
																: '',
													}}
												>
													<div key={0} style={{ fontSize: '25px' }}>
														<NavLink
															onClick={(e) =>
																this.containsShadow(e, match)
															}
															className="login"
															to={
																round.roundNumber ==
																this.tournamentObject.numberOfRounds
																	? '/matches/edit/' +
																	  (parseInt(
																			this.tournamentObject
																				.numberOfRounds
																	  ) -
																			1) +
																	  ',' +
																	  1
																	: '/matches/edit/' +
																	  round.roundNumber +
																	  ',' +
																	  match.ind
															}
														>
															{round.roundNumber ==
															this.tournamentObject.numberOfRounds
																? 'Bronze final'
																: round.roundNumber ==
																  this.tournamentObject
																		.numberOfRounds -
																		1
																? 'Final'
																: 'Match ' + match.matchNumber}
														</NavLink>
													</div>
													{match.teams
														.filter(
															(team) =>
																team.constructor.name !=
																'ShadowTeam'
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
																	<em
																		style={{
																			color:
																				match.winner !=
																					null &&
																				match.winner.id !=
																					team.id
																					? 'red'
																					: '#fdf913',
																		}}
																	>
																		<b>{team.name}</b>
																		{team.teamMembers.length ==
																		1 ? (
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
					{/* {this.tournamentObject.generalSettings.type != 'bracket' ? (</table>) : (</em>)} */}
				</div>
				<div className="winner" id="winner"></div>
				<div class="confetti" id="confetti">
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
					<div class="confetti-piece"></div>
				</div>
				<div className="saveConfirm" id="saveConfirm">
					The tournament is saved!!!
				</div>
			</div>
		);
	}

	tegn() {
		let startX = 410;
		let startY = 210;
		for (let j = 0; j < this.tournamentObject.rounds.length - 1; j++) {
			let drawX = startX + j * 540;
			let drawY = startY + hoyde[j];
			let tileggY = 0;
			for (let i = 0; i < this.length / 2 ** (j + 1); i++) {
				let c = document.getElementById('canvas');
				var ctx = c.getContext('2d');
				ctx.beginPath();
				ctx.moveTo(drawX - 55, drawY + tileggY);
				ctx.lineTo(drawX + 100, drawY + tileggY);
				ctx.moveTo(drawX - 55, drawY + 140 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 100, drawY + 140 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 100, drawY + tileggY);
				ctx.moveTo(drawX + 100, drawY + 70 * 2 ** j + tileggY);
				ctx.lineTo(drawX + 180, drawY + 70 * 2 ** j + tileggY);
				ctx.strokeStyle = '#fdf913';
				ctx.lineWidth = 2;
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
	}

	containsShadow(event, match) {
		if (match.teams.map((e) => e.constructor.name).includes('ShadowTeam')) {
			event.preventDefault();
		}
	}

	save() {
		function addsTournament(inn) {
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
				let e = await addsTournament(inn);
				let f = await addsGameMatch(e);
				let g = await addsTeam(f);
				let h = await addsTeamMember(g);

				return h;
			} catch (error) {
				console.error(error);
			}
		}

		(async () => {
			tournamentID = this.tournamentObject.tournamentID;
			let message = await kjør([this.tournamentObject]);
		})();
	}
	updateScore() {
		for (let i = 0; i < this.tournamentObject.numberOfRounds; i++) {
			for (let j = 0; j < this.tournamentObject.rounds[i].matches.length; j++) {
				pool.query(
					'UPDATE GameMatch SET Team1=?, Team2=?, Team1Score=?, Team2Score=? WHERE RoundNumber=? && MatchNumber=? && TournamentID=?',
					[
						this.tournamentObject.rounds[i].matches[j].teams[0].id,
						this.tournamentObject.rounds[i].matches[j].teams[1].id,
						this.tournamentObject.rounds[i].matches[j].results.length != 2
							? 0
							: this.tournamentObject.rounds[i].matches[j].results[0],
						this.tournamentObject.rounds[i].matches[j].results.length != 2
							? 0
							: this.tournamentObject.rounds[i].matches[j].results[1],
						i,
						j,
						this.tournamentObject.tournamentID,
					],
					(error, results) => {
						if (error) return console.error(error);
					}
				);
			}
		}
		document.getElementById('saveConfirm').style.visibility = 'visible';
		setTimeout(() => {
			document.getElementById('saveConfirm').style.visibility = 'hidden';
		}, 2000);
	}

	mounted() {
		console.log(this.tournamentObject.rounds.length);
		if (
			this.tournamentObject.rounds[this.tournamentObject.numberOfRounds - 1].matches.length ==
			2
		) {
			this.roundsInTournament = this.tournamentObject.rounds.concat([
				new Round(
					this.tournamentObject.numberOfRounds,
					this.tournamentObject.numberOfRounds,
					this.tournamentObject,
					[
						this.tournamentObject.rounds[this.tournamentObject.numberOfRounds - 1]
							.matches[1].teams[0],
						this.tournamentObject.rounds[this.tournamentObject.numberOfRounds - 1]
							.matches[1].teams[1],
					]
				),
			]);
		} else {
			this.roundsInTournament = this.tournamentObject.rounds;
		}
		if (
			this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches.length ==
			2
		) {
			this.roundsInTournament[this.roundsInTournament.length - 1].matches[0].results =
				this.tournamentObject.rounds[
					this.tournamentObject.rounds.length - 1
				].matches[1].results;

			this.roundsInTournament[this.roundsInTournament.length - 1].matches[0].teams =
				this.tournamentObject.rounds[
					this.tournamentObject.rounds.length - 1
				].matches[1].teams;
			console.log(this.roundsInTournament);
		}
		pool.query('SELECT TournamentID FROM Tournament', (error, results) => {
			if (error) return console.error(error); // If error, show error in console (in red text) and return

			this.tournamentIDs = results;
			this.tournamentIDs = this.tournamentIDs.map((Tournament) => Tournament.TournamentID);
			this.tournamentIDs.sort((a, b) => b - a);
			this.tournamentIDs.some((id) => id == this.tournamentObject.tournamentID)
				? console.log('Trenger ikke å lagre')
				: this.save();
		});

		setInterval(() => {
			if (
				this.loaded &&
				this.tournamentObject.generalSettings.type == 'bracket' &&
				!this.allredyLoaded
			) {
				this.tegn();
				this.allredyLoaded = true;
			}
		}, 20);

		if (this.tournamentObject.winner != null) {
			document.getElementById('confetti').style.visibility = 'visible';
			document.getElementById('winner').style.visibility = 'visible';
			document.getElementById('winner').innerHTML =
				'The winner of the tournament is: ' + this.tournamentObject.winner.name;
			this.updateScore();
		}

		setInterval(() => {
			if (
				this.tournamentObject.winner != null &&
				(this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches
					.length == 1 ||
					this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches[1]
						.winner != undefined) &&
				document.getElementById('confetti') != null &&
				!this.showedConfetti
			) {
				document.getElementById('confetti').style.visibility = 'visible';
				document.getElementById('winner').style.visibility = 'visible';
				document.getElementById('winner').innerHTML =
					'The winner of the tournament is: ' + this.tournamentObject.winner.name;
				this.updateScore();
				this.showedConfetti = true;
			}
		}, 20);

		console.log(this.tournamentObject);
	}
}
