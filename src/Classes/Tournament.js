import TeamMember from './TeamMember';

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
		fillOutBracket();
		this.teams = sortTeams(this.teams);
	}

	fillOutBracket() {}

	sortTeams(teams) {
		let sortedarr = [];

		let ink = 0;
		var start = 0;
		for (let i = 1; i <= teams.length; i = Math.pow(2, ink)) {
			for (let j = start; j < Math.pow(2, ink); j++) {
				start = j;
				numb = j;
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
