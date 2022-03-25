import Round from './round';

class Torunament {
	name;
	TorunamentId;
	generalSettings = null;
	teams = [];
	rounds = [];

	constructor(name, TorunamentId, teams, generalSettings) {
		this.name = name;
		this.TorunamentId = TorunamentId;
		this.generalSettings = generalSettings;
		if (teams != false) {
			this.teams = teams;
			//until more implimented
			this.createBrackets();
		}
	}

	startTournament() {
		if (generalSettings.torunamentType == 'brackets') {
			createBrackets();
		} else {
			createRoundRobin();
		}
	}

	createBrackets() {
		this.numberOfRounds = this.setBracketRounds(this.teams);
		this.playWalkover();
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

	playWalkover() {
		for (const i of this.rounds[0].matches) {
			if (i.teams[0].constructor.name == 'ShadowTeam') {
				i.updateScore(0, 3);
			} else if (i.teams[1].constructor.name == 'ShadowTeam') {
				i.updateScore(3, 0);
			}
		}
	}
}

export default Torunament;
