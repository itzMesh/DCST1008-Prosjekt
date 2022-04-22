import ShadowTeam from './shadowTeam';
import Match from './match';

class Round {
	tournament;
	firstMatchNumber;
	roundNumber;
	numberOfRounds;
	matches = [];
	teams = [];

	//tournament is the Object the round is a part of
	constructor(numberOfRounds, roundNumber, tournament, teams) {
		this.tournament = tournament;
		this.roundNumber = roundNumber;
		this.numberOfRounds = numberOfRounds;
		if (teams != false) {
			this.teams = teams;
		}
		if (this.tournament.generalSettings.type == 'bracket') {
			this.teams = this.fillOutTeams(this.teams);
			//sorts team by average thropies
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
		} else {
			this.teams = this.shuffleTeams();
		}
		//uses previous round to set first match number
		this.firstMatchNumber =
			roundNumber == 0
				? 1
				: this.tournament.rounds[roundNumber - 1].firstMatchNumber +
				  this.tournament.rounds[roundNumber - 1].matches.length;
		this.addMatches();
	}

	fillOutTeams(teams) {
		//adds shadow teams to  make shure there's enoughp teams to make a bracket
		while (teams.length < Math.pow(2, this.numberOfRounds - this.roundNumber)) {
			teams.push(new ShadowTeam(this.tournament.TournamentID));
		}
		return teams;
	}

	//set seeds in a list sorted by trophies
	setseeds() {
		for (const i in this.teams) {
			this.teams[i].seed = parseInt(i) + 1;
		}
	}

	//Sorts a list of teams so that the first element faces the secound, the third faces the fourth, and so forth
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

	shuffleTeams() {
		let out = [];
		for (let i = 0; i < Math.floor(this.teams.length / 2); i++) {
			out.push(this.teams[i], this.teams[this.teams.length - 1 - i]);
		}
		return out;
	}

	//adds matches to the rounds
	addMatches() {
		for (let i = 0; i < Math.floor(this.teams.length / 2); i++) {
			this.matches.push(
				new Match(
					this.teams[i * 2],
					this.teams[i * 2 + 1],
					i + this.firstMatchNumber,
					this,
					i,
					false
				)
			);
		}

		if (
			this.roundNumber == this.numberOfRounds - 1 &&
			this.tournament.teams.filter((e) => e.constructor.name == 'Team').length > 3
		) {
			this.tournament.hasBronze = true;
			this.matches.push(
				new Match(
					new ShadowTeam(this.tournament.TournamentID, 1),
					new ShadowTeam(this.tournament.TournamentID, 2),
					'Bronze final',
					this,
					1,
					false
				)
			);
		}
	}
}

export default Round;
