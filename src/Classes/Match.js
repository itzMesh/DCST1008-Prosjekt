class Match {
	round;
	teams = [];
	results = [0, 0];
	matchNumber;
	matchSeed;
	matchSeed2;
	winner;
	looser;
	matchFinished;

	constructor(team0, team1, matchNumber, round, ind) {
		this.round = round;
		this.ind = ind;
		this.teams[0] = team0;
		this.teams[1] = team1;
		this.matchNumber = matchNumber;
		this.matchSeed = team0.seed < team1.seed ? team0.seed : team1.seed;
	}

	//updates the score as well as sending the winner to the next round
	updateScore(score0, score1) {
		this.results[0] = score0;
		this.results[1] = score1;
		if (this.teams[0].constructor.name != 'ShadowTeam') {
			this.teams[0].score[this.round.roundNumber] = 0;
			this.teams[0].pointDifference[this.round.roundNumber] = score0 - score1;
		}
		if (this.teams[1].constructor.name != 'ShadowTeam') {
			this.teams[1].score[this.round.roundNumber] = 0;
			this.teams[1].pointDifference[this.round.roundNumber] = score1 - score0;
		}
		if (score0 - score1 != 0) {
			this.winner = score0 > score1 ? this.teams[0] : this.teams[1];
			this.looser = score0 > score1 ? this.teams[1] : this.teams[0];
			this.winner.seed = this.matchSeed;
			this.winner.score[this.round.roundNumber] = 3;
			if (
				this.round.roundNumber != this.round.numberOfRounds - 1 &&
				this.round.tournament.generalSettings.type == 'bracket'
			) {
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
			} else if (
				this.round.roundNumber == this.round.numberOfRounds - 1 &&
				this.round.tournament.generalSettings.type == 'bracket'
			) {
				this.round.tournament.winner = this.winner;
			}
			if (
				this.round.roundNumber == this.round.numberOfRounds - 2 &&
				this.round.tournament.hasBronze
			) {
				this.round.tournament.rounds[this.round.roundNumber + 1].matches[1].teams[0] =
					this.round.matches[0].looser;
				this.round.tournament.rounds[this.round.roundNumber + 1].matches[1].teams[1] =
					this.round.matches[1].looser;
				console.log('DETTE ER EN TEST');
			}
		} else if (
			score0 != 0 &&
			this.results.length != 0 &&
			this.round.tournament.generalSettings.type != 'bracket'
		) {
			this.teams[0].score[this.round.roundNumber] = 1;
			this.teams[1].score[this.round.roundNumber] = 1;
		}
		if (this.round.tournament.generalSettings.type != 'bracket') {
			this.round.tournament.findRoundRobinWiner();
		}
	}
}

export default Match;
