import Round from './Round';

class Torunament {
	generalSettings = null;
	teams = [];
	rounds = [];

	constructor() {}

	startTournament() {
		if (generalSettings.torunamentType == 'brackets') {
			createBrackets();
		} else {
			createRoundRobin();
		}
	}

	createBrackets() {
		this.numberOfRounds = this.setBracketRounds(this.teams);
	}

	setBracketRounds(teams) {
		let numberOfRounds = 0;
		while (Math.pow(2, numberOfRounds) < teams.length) {
			numberOfRounds += 1;
		}
		let roundNumber = 0;
		while (Math.pow(2, roundNumber) < teams.length) {
			if (roundNumber == 0) {
				this.rounds.push(new Round(numberOfRounds, 0, this, teams));
			} else {
				this.rounds.push(new Round(numberOfRounds, roundNumber, this));
			}
			roundNumber += 1;
		}
		return numberOfRounds;
	}
}

export default Torunament;
