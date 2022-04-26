import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, withRouter, Redirect } from 'react-router-dom';
import Torunament from '../Classes/tournament';
import TeamMember from '../Classes/teamMember';
import Team from '../Classes/team';
import ShadowTeam from '../Classes/shadowTeam';
import GeneralSettings from '../Classes/GeneralSettings';
import { updateDatabase } from '../Database/services';

export let tournamentPageObj = [null, new Date()];

export class TournamentPage extends Component {
	tournamentObject = null;
	tournamentPageObj = tournamentPageObj;
	teamObjects = [];
	teamMemberObjects = [];
	matchObjects = [];
	link = '';
	loded = 'Loading from database';
	canlink = [];

	render() {
		//if (!this.tournamentObject) return null;

		return (
			<div className="text">
				<br />
				<div>{this.loded}</div>
				{this.canlink.map((e, i) => (
					<Redirect key={i} to={this.link}></Redirect>
				))}
			</div>
		);
	}

	mounted() {
		let tournamentID = [this.props.match.params.TournamentID];
		document.body.style.backgroundImage = 'url(images/blur.png)';

		function firstDatabase() {
			return new Promise((resolve) => {
				updateDatabase.selectTeamMember(tournamentID, (results) => resolve([results]));
			});
		}
		function secondDatabase(inn) {
			return new Promise((resolve) => {
				updateDatabase.selectGameMatch(tournamentID, (results) => {
					let out = inn;
					out.push(results);
					resolve(out);
				});
			});
		}
		function thirdDatabase(inn) {
			return new Promise((resolve) => {
				updateDatabase.selectTeam(tournamentID, (results) => {
					let out = inn;
					out.push(results);
					resolve(out);
				});
			});
		}
		function fourthDatabase(inn) {
			return new Promise((resolve) => {
				updateDatabase.selectTournament(tournamentID, (results) => {
					let out = inn;
					out.push(results);
					resolve(out);
				});
			});
		}

		function makeClasses(table, teamObj, teamMemberObj, tournamentObj, matchObj) {
			return new Promise((resolve) => {
				let promTeamMember = table[0];
				let promMatches = table[1];
				let promTeam = table[2];
				let promTournamentChoser = table[3];

				for (const i of promTeam) {
					if (!i.IsShadow) {
						teamObj.push(new Team(i.TeamName, i.TeamID, i.TournamentID));
					} else {
						teamObj.push(new ShadowTeam(i.TournamentID));
					}
				}

				for (const i of promTeamMember) {
					let aTeamMember = new TeamMember(
						i.PlayerName,
						i.PlayerTrophies,
						i.TeamID,
						promTournamentChoser[0].TournamentID
					);
					teamMemberObj.push(aTeamMember);
					for (const j of teamObj.filter(
						(team) => team.constructor.name != 'ShadowTeam'
					)) {
						if (j.id == i.TeamID) {
							j.addMember(aTeamMember);
						}
					}
				}
				tournamentObj = new Torunament(
					promTournamentChoser[0].TournamentName,
					promTournamentChoser[0].TournamentID,
					teamObj,
					new GeneralSettings(
						promTournamentChoser[0].TournamentType,
						promTournamentChoser[0].TournamentName,
						promTournamentChoser[0].TournamentGamemode
					)
				);
				promMatches.sort((a, b) =>
					a.RoundNumber != b.RoundNumber
						? a.RoundNumber - b.RoundNumber
						: a.MatchNumber - b.MatchNumber
				);
				for (const i of promMatches) {
					tournamentObj.rounds[i.RoundNumber].matches[i.MatchNumber].updateScore(
						i.Team1Score,
						i.Team2Score
					);
				}

				for (const i of matchObj) {
					tournamentObj.rounds[i.round.roundNumber].matches[i.ind] = i;
				}

				resolve([teamObj, teamMemberObj, tournamentObj, matchObj]);
			});
		}

		async function Kjør(teamObj, teamMemberObj, tournamentObj, matchObj) {
			try {
				let table1 = await firstDatabase();
				let table2 = await secondDatabase(table1);
				let table3 = await thirdDatabase(table2);
				let table4 = await fourthDatabase(table3);

				let finished = await makeClasses(
					table4,
					teamObj,
					teamMemberObj,
					tournamentObj,
					matchObj
				);
				return finished;
			} catch (error) {
				console.error(error);
			}
		}
		(async () => {
			let out = await Kjør(
				this.teamObjects,
				this.teamMemberObjects,
				this.tournamentObject,
				this.matchObjects
			);

			this.teamObjects = out[0];
			this.teamMemberObjects = out[1];
			this.tournamentObject = out[2];
			tournamentPageObj = [this.tournamentObject, new Date()];
			this.matchObjects = out[3];

			this.link =
				'/tournamentpage/' +
				this.tournamentObject.TournamentID +
				'/' +
				this.tournamentObject.TournamentID;

			this.loded = 'Finished loading, you may now proceed';
			this.canlink[0] = 'a';
		})();
	}
}
