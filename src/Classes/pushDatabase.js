import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route, withRouter } from 'react-router-dom';
import { pool } from '../mysql-pool';

class UpdateDatabase {
	deleteTournament(TournamentID, success) {
		pool.query(
			'DELETE FROM Tournament1 WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	addTournament(tournamentObject, success) {
		console.log(
			tournamentObject.name,
			tournamentObject.generalSettings.type,
			tournamentObject.generalSettings.gamemode
		);

		pool.query(
			'INSERT INTO Tournament1 (TournamentID, TournamentName, TournamentType, TournamentGamemode) VALUES (?, ?, ?, ?)',
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
			'DELETE FROM GameMatch1 WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
	addGameMatch(match, success) {
		pool.query(
			'INSERT INTO GameMatch1 (TournamentID, MatchNumber, RoundNumber, Team1, Team2, Completed, Team1Score, Team2Score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				match.round.tournament.TorunamentId,
				match.ind,
				match.round.roundNumber,
				match.teams[0].id,
				match.teams[1].id,
				match.completed,
				match.results.length != 2 ? 0 : match.results[0],
				match.results.length != 2 ? 0 : match.results[1],
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
}
export let updateDatabase = new UpdateDatabase();
