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
		console.log(this);
		if (teams != false) {
			this.teams = teams;
			this.startTournament();
		}
	}

	startTournament() {
		if (this.generalSettings.type == 'bracket') {
			this.createBrackets();
		} else {
			this.createRoundRobin();
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
				this.rounds.push(new Round(numberOfRounds, roundNumber, this, false));
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
	createRoundRobin() {
		this.numberOfRounds = this.setRoundRobinRounds(this.teams);
		this.playWalkover();
	}

	setRoundRobinRounds(teams) {
		let numberOfRounds = teams.length - 1 + (teams.length % 2);
		let roundNumber = 0;
		while (roundNumber < numberOfRounds) {
			this.rounds.push(new Round(numberOfRounds, roundNumber, this, teams));

			if (teams.length % 2 == 0) {
				let secondTeam = teams[1];
				teams.splice(1, 1);
				teams.push(secondTeam);
			} else {
				let firstTeam = teams.shift();
				teams.push(firstTeam);
			}

			roundNumber += 1;
		}
		return numberOfRounds;
	}
}

export default Torunament;
