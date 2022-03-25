import ShadowTeam from './shadowTeam';
import Match from './match';
import Torunament from './tournament';

class Round {
	tournament;
	firstMatchNumber;
	roundNumber;
	numberOfRounds;
	matches = [];
	teams = [];

	constructor(numberOfRounds, roundNumber, tournament, teams) {
		this.tournament = tournament;
		this.roundNumber = roundNumber;
		this.numberOfRounds = numberOfRounds;
		if (teams != undefined) {
			this.teams = teams;
		}
		this.teams = this.fillOutTeams(this.teams);
		this.teams.sort((a, b) => {
			if (a.averageTrophies < b.averageTrophies) {
				return 1;
			}
			if (a.averageTrophies > b.averageTrophies) {
				return -1;
			}
			return 0;
		});

		this.setseeds();
		this.teams = this.sortTeams(this.teams);
		this.firstMatchNumber =
			roundNumber == 0
				? 1
				: this.tournament.rounds[roundNumber - 1].firstMatchNumber +
				  this.tournament.rounds[roundNumber - 1].numberOfRounds;
		this.addMatches();
	}

	fillOutTeams(teams) {
		while (teams.length < Math.pow(2, this.numberOfRounds - this.roundNumber)) {
			teams.push(new ShadowTeam(this.tournament.TorunamentId));
		}
		return teams;
	}

	setseeds() {
		for (const i in this.teams) {
			this.teams[i].seed = parseInt(i) + 1;
		}
	}

	sortTeams(teams) {
		let sortedarr = [];

		let ink = 0;
		let start = 0;
		for (let i = 1; i <= teams.length; i = Math.pow(2, ink)) {
			for (let j = start; j < Math.pow(2, ink); j++) {
				start = j;
				let numb = j;
				if (sortedarr.length == 0) {
					sortedarr.push(teams[0]);
				} else {
					for (let k = 0; k < sortedarr.length; k++) {
						if (sortedarr[k].seed + teams[numb].seed == i + 1) {
							sortedarr.splice(k + 1, 0, teams[numb]);
							break;
						}
					}
				}
			}
			ink++;
		}
		return sortedarr;
	}

	addMatches() {
		for (let i = 0; i < this.teams.length / 2; i++) {
			console.log(i);
			this.matches.push(
				new Match(
					this.teams[i * 2],
					this.teams[i * 2 + 1],
					i + this.firstMatchNumber,
					this,
					i,
					false,
					false,
					false
				)
			);
		}
	}
}

export default Round;
