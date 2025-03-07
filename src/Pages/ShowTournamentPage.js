import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { tournamentplayer } from './addSinglePlayer';
import { tournamentplayers } from './addTwoPlayerTeams';
import { tournamentPageObj } from './tournamentPage';
import { updateDatabase } from '../Database/services';
import Round from '../Classes/round';

let hoyde = [];
let tournamentID = 0;
//this class function is thow show the tournament setup. The tournament setups are dynamic and is not hard coded but each layout will be unique for each tournament
//we use math to calculate how the layout will be and each match heigh for a clean looking tournament setup with brackets.
export class ShowTournamentPage extends Component {
	updateDatabase = updateDatabase;
	tournamentIDs = [];
	loaded = false;
	tournamentObject = this.getTournament();
	length = this.tournamentObject.rounds[0].matches.length;
	roundsInTournament = [];
	allredyLoaded = false;
	showedConfetti = false;
	//render the whole tournament page either with brackets or round robin
	render() {
		if (this.tournamentObject.generalSettings.gamemode[4] == 'D') {
			document.body.style.backgroundImage = 'url(images/purple.png)';
		}
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
							top: '190px',
						}}
					>
						<table className="table">
							<thead>
								<tr>
									<th>Place</th>
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
								.map((member, i) => (
									<tbody key={i}>
										<tr>
											<td>{i + 1 + '.'}</td>
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
					<em className="navigate" onClick={this.updateScore} type="button">
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
					{/*Loops throw each round in the tournament */}
					{this.roundsInTournament.map((round, i) => (
						<div
							key={i}
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
									{/* Here we use the information from our method Brackets and give div the height needed for a clean looking tournament*/}
									{/* Loops throw each match in the round  */}
									{round.matches
										.filter(
											(match) =>
												round.roundNumber != round.numberOfRounds - 1 ||
												match.ind == 0 ||
												round.tournament.generalSettings.type != 'bracket'
										)
										.map((match, i) => (
											<div
												key={i}
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
															className="list"
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
																			1 &&
																  this.tournamentObject
																		.generalSettings.type ==
																		'bracket'
																? 'Final'
																: 'Match ' + match.matchNumber}
														</NavLink>
													</div>
													{/* Loops throw the teams that playes in each match in each round */}
													{match.teams
														.filter(
															(team) =>
																team.constructor.name !=
																'ShadowTeam'
														)
														.map((team, i) => (
															<div key={i}>
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
																					(member, i) => (
																						<em key={i}>
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
				</div>
				{/* confetti when a winner is declared */}
				<div className="winner" id="winner"></div>
				<div className="confetti" id="confetti">
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
					<div className="confetti-piece"></div>
				</div>
				<div className="saveConfirm" id="saveConfirm">
					The tournament is saved
				</div>
			</div>
		);
	}
	//draw the line between matches
	tegn() {
		let startX = 410;
		let startY = 200;
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
	//calculates how much space we need over each first match in every round for the brackets to look nice
	brackets(e) {
		let out = 0;
		hoyde = [0];
		for (let i = 0; i < e; i++) {
			out += 70 * Math.pow(2, i);
			hoyde.push(out);
		}
	}
	//checks if team is a shodowteam
	containsShadow(event, match) {
		if (match.teams.map((e) => e.constructor.name).includes('ShadowTeam')) {
			event.preventDefault();
		}
	}
	//this method is runned each time a new tournament is created and displayed and saves the tournament to the database
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
							console.log('added gamematch');
						});
					}
				}
				resolve(inn);
			});
		}

		function addsTeam(inn) {
			console.log(inn[0].teams);
			return new Promise((resolve) => {
				for (const team of inn[0].teams.filter((e) => e.constructor.name == 'Team')) {
					updateDatabase.addTeam(team, () => {
						console.log('added team');
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
							console.log('added teamMembers');
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

	//this method is used for updating the tournament to the database and us called on from the "Save" button
	updateScore() {
		for (let i = 0; i < this.tournamentObject.numberOfRounds; i++) {
			for (let j = 0; j < this.tournamentObject.rounds[i].matches.length; j++) {
				updateDatabase.updateGameMatch(this.tournamentObject, i, j, () => {
					console.log('uppdated gamematch');
				});
			}
		}
		let saved = document.getElementById('saveConfirm');
		saved.style.visibility = 'visible';
		setTimeout(() => {
			saved.style.visibility = 'hidden';
		}, 2000);
	}
	//pull the right tournament object depending on wich class createt it
	getTournament() {
		let tournamentp =
			tournamentplayer[1] > tournamentplayers[1] ? tournamentplayer : tournamentplayers;
		let tournamentObject =
			tournamentp[1] > tournamentPageObj[1] ? tournamentp[0] : tournamentPageObj[0];
		return tournamentObject;
	}
	//runs a numerous of if statements when page is loaded critically for the functionality
	mounted() {
		document.body.style.backgroundImage = 'url(images/blur.png)';
		console.log(this.tournamentObject.rounds.length);
		if (
			this.tournamentObject.rounds[this.tournamentObject.numberOfRounds - 1].matches.length ==
				2 &&
			this.tournamentObject.generalSettings.type == 'bracket'
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
			console.log('TEster dette er rart');
		} else {
			this.roundsInTournament = this.tournamentObject.rounds;
			console.log(this.roundsInTournament);
		}
		if (
			this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches.length ==
				2 &&
			this.tournamentObject.generalSettings.type == 'bracket'
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

		function database() {
			return new Promise((resolve) => {
				updateDatabase.selectAllTournaments((results) => {
					console.log(results);
					resolve(results);
				});
			});
		}

		function workWithDatabase(tournamentIDs, tournamentObject, site) {
			return new Promise((resolve) => {
				console.log('test2');
				tournamentIDs = tournamentIDs.map((Tournament) => Tournament.TournamentID);
				tournamentIDs.sort((a, b) => b - a);
				tournamentIDs.some((id) => id == tournamentObject.tournamentID)
					? console.log('Do not need to save')
					: site.save();
				resolve(tournamentIDs);
			});
		}

		async function Kjør(tournamentObject, site) {
			try {
				let tournamentIDs = await database();
				let tournamentIDs2 = await workWithDatabase(tournamentIDs, tournamentObject, site);

				return tournamentIDs2;
			} catch (error) {
				console.error(error);
			}
		}
		(async () => {
			this.tournamentIDs = await Kjør(this.tournamentObject, this);
		})();

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

		setInterval(() => {
			if (
				this.tournamentObject.winner != null &&
				this.tournamentObject.generalSettings.type == 'bracket' &&
				(this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches
					.length == 1 ||
					this.tournamentObject.rounds[this.tournamentObject.rounds.length - 1].matches[1]
						.winner != undefined) &&
				document.getElementById('confetti') != null &&
				!this.showedConfetti
			) {
				let confetti = document.getElementById('confetti');
				let winnerPromt = document.getElementById('winner');
				document.getElementById('confetti').style.visibility = 'visible';
				document.getElementById('winner').style.visibility = 'visible';
				document.getElementById('winner').innerHTML =
					'The winner of the tournament is: ' + this.tournamentObject.winner.name;
				this.updateScore();
				this.showedConfetti = true;
				setTimeout(() => {
					winnerPromt.style.visibility = 'hidden';
					confetti.style.visibility = 'hidden';
				}, 5000);
			} else if (
				this.tournamentObject.winner != null &&
				this.tournamentObject.generalSettings.type != 'bracket' &&
				document.getElementById('confetti') != null &&
				!this.showedConfetti
			) {
				let confetti = document.getElementById('confetti');
				let winnerPromt = document.getElementById('winner');
				confetti.style.visibility = 'visible';
				winnerPromt.style.visibility = 'visible';
				winnerPromt.innerHTML = this.tournamentObject.tie
					? 'The tournament was a tie'
					: 'The winner of the tournament is: ' + this.tournamentObject.winner.name;
				this.updateScore();
				this.showedConfetti = true;
				setTimeout(() => {
					winnerPromt.style.visibility = 'hidden';
					confetti.style.visibility = 'hidden';
				}, 5000);
			}
		}, 20);

		console.log(this.tournamentObject);
	}
}
