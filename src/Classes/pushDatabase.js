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
		pool.query(
			'INSERT INTO Tournament1 (TournamentName, TournamentType, TournamentGamemode) VALUES (?, ?, ?)',
			[
				tournamentObject.generalSettings.name,
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
	addGameMatch(tournamentObject, success) {
		pool.query(
			'INSERT INTO Tournament1 (TournamentName, TournamentType, TournamentGamemode) VALUES (?, ?, ?)',
			[
				tournamentObject.generalSettings.name,
				tournamentObject.generalSettings.type,
				tournamentObject.generalSettings.gamemode,
			],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
}
export let updateDatabase = new UpdateDatabase();
