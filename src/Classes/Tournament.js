import ShadowTeam from './ShadowTeam';

class Torunament {
	generalSettings = null;
	teams = [];

	constructor() {}

	startTournament() {
		if (generalSettings.torunamentType == 'brackets') {
			createBrackets();
		} else {
			createRoundRobin();
		}
	}

	createBrackets() {
		this.rounds = this.setBracketRounds(this.teams);
		this.teams = this.fillOutBracket(this.teams);
		//this.teams = sortTeams(this.teams);
	}

	setBracketRounds(teams) {
		let rounds = 0;
		while (Math.pow(2, rounds) < teams.length) {
			rounds += 1;
		}
		return rounds;
	}

	fillOutBracket(teams) {
		while (teams.length < Math.pow(2, this.rounds)) {
			teams.push(new ShadowTeam());
		}
		return teams;
	}

	sortTeams(teams) {
		let sortedarr = [];

		let ink = 0;
		let start = 0;
		for (let i = 1; i <= teams.length; i = Math.pow(2, ink)) {
			for (let j = start; j < Math.pow(2, ink); j++) {
				start = j;
				let numb = j;
				console.log(numb);
				if (sortedarr.length == 0) {
					sortedarr.push(teams[0]);
				} else {
					for (let k = 0; k < sortedarr.length; k++) {
						if (sortedarr[k] + teams[numb] == i + 1) {
							sortedarr.splice(k + 1, 0, teams[numb]);
							break;
						}
					}
				}
			}
			ink += 1;
		}
		return sortedarr;
	}
}

export default Torunament;
