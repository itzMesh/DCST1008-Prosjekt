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
		while (Math.pow(2, rounds) < teams.length) {
			if (numberOfRounds == 0) {
				this.rounds.push(new Round(0, teams));
			} else {
				this.rounds.push(new Round(numberOfRounds));
			}
			numberOfRounds += 1;
		}
		return rounds;
	}
}

export default Torunament;
