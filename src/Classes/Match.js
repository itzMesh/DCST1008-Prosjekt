class Match {
	round;
	teams = [];
	results = [];
	matchNumber;
	matchSeed;
	winner;
	matchFinished;
	completed;

	constructor(team0, team1, matchNumber, round, ind, score0, score1, completed) {
		this.round = round;
		this.ind = ind;
		this.teams[0] = team0;
		this.teams[1] = team1;
		this.matchNumber = matchNumber;
		this.matchSeed = team0.seed < team1.seed ? team0.seed : team1.seed;
		this.completed = completed;
		if (score0 != false && score1 != false) {
			this.updateScore(score0, score1);
		}
	}

	//updates the score as well as sending the winner to the next round
	updateScore(score0, score1) {
		this.results[0] = score0;
		this.results[1] = score1;
		if (score0 - score1 != 0) {
			this.winner = score0 > score1 ? this.teams[0] : this.teams[1];
			this.winner.seed = this.matchSeed;
			if (this.round.roundNumber != this.round.numberOfRounds - 1) {
				for (
					let i = 0;
					i < this.round.tournament.rounds[this.round.roundNumber + 1].teams.length;
					i++
				) {
					if (
						this.round.tournament.rounds[this.round.roundNumber + 1].teams[i].seed ==
						this.matchSeed
					) {
						this.round.tournament.rounds[this.round.roundNumber + 1].teams[i] =
							this.winner;
					}
				}
				this.round.tournament.rounds[this.round.roundNumber + 1].matches = [];
				this.round.tournament.rounds[this.round.roundNumber + 1].addMatches();
			}
		}
	}
}

export default Match;
