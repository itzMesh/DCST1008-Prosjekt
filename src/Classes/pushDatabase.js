import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, withRouter } from 'react-router-dom';
import { pool } from '../mysql-pool';

class UpdateDatabase {
	deleteTournament(TournamentID, success) {
		pool.query(
			'DELETE FROM Tournament WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	addTournament(tournamentObject, success) {
		pool.query(
			'INSERT INTO Tournament (TournamentID, TournamentName, TournamentType, TournamentGamemode) VALUES (?, ?, ?, ?)',
			[
				tournamentObject.TorunamentId,
				tournamentObject.name,
				tournamentObject.generalSettings.type,
				tournamentObject.generalSettings.gamemode,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	deleteGameMatch(TournamentID, success) {
		pool.query(
			'DELETE FROM GameMatch WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	addGameMatch(match, success) {
		pool.query(
			'INSERT INTO GameMatch (TournamentID, MatchNumber, RoundNumber, Team1, Team2, Team1Score, Team2Score) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[
				match.round.tournament.TorunamentId,
				match.ind,
				match.round.roundNumber,
				match.teams[0].id,
				match.teams[1].id,
				match.results.length != 2 ? 0 : match.results[0],
				match.results.length != 2 ? 0 : match.results[1],
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	deleteTeams(TournamentID, success) {
		pool.query('DELETE FROM Team WHERE TournamentID=?', [TournamentID], (error, results) => {
			if (error) return console.error(error);

			success();
		});
	}

	addTeam(team, success) {
		pool.query(
			'INSERT INTO Team (TeamID, TeamName, IsShadow, TournamentID) VALUES (?, ?, ?, ?)',
			[team.id, team.name, team.constructor.name != 'ShadowTeam' ? 0 : 1, team.tournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	deleteTeamMember(TournamentID, success) {
		pool.query(
			'DELETE FROM TeamMember WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}

	addTeamMember(teamMemberInfo, success) {
		pool.query(
			'INSERT INTO TeamMember (PlayerName, PlayerTrophies, TeamID, TournamentID) VALUES (?, ?, ?, ?)',
			[
				teamMemberInfo.name,
				teamMemberInfo.trophies,
				teamMemberInfo.teamID,
				teamMemberInfo.tournamentID,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
}
export let updateDatabase = new UpdateDatabase();
