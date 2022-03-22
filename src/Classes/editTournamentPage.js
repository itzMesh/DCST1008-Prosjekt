import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from '../mysql-pool';

class EditTournamentPage extends Component {
	matchInfo = null;

	render() {
		if (!this.matchInfo) return null;

		return (
			<ul>
				<li>Completed: {this.matchInfo.Completed}</li>
				<li>Winner: {this.matchInfo.Winner}</li>
			</ul>
		);
	}

	mounted() {
		pool.query(
			'SELECT MatchID, Completed, Winner FROM GameMatch WHERE MatchID=?',
			[this.props.match.params.MatchID],
			(error, results) => {
				if (error) return console.error(error); // If error, show error in console (in red text) and return

				this.matchInfo = results;
			}
		);
	}
}

export default EditTournamentPage;
