import { pool } from '../mysql-pool';

class EditService {
	getTournament(TournamentID, success) {
		pool.query(
			'SELECT * FROM Tournament WHERE TournamentID=?',
			[TournamentID],
			(error, results) => {
				if (error) return console.error(error);

				success(results[0]);
			}
		);
	}

	updateWinner(match, success) {
		pool.query(
			'UPDATE GameMatch SET Team1Score=?, Team2Score=? WHERE MatchID=?',
			[match.Team1Score, match.Team2Score, match.MatchID],
			(error, results) => {
				if (error) return console.error(error);

				success();
			}
		);
	}
}
export let editService = new EditService();
