//this class makes shadowteams and is critical for our seeding. This is because the best players will play against this teams in a bracket tournament and automaticly win
class ShadowTeam {
	tournamentID;
	seed;

	constructor(tournamentID, seed) {
		this.tournamentID = tournamentID;
		if (seed == undefined) {
			('');
		} else {
			this.seed = seed;
		}
		this.averageTrophies = -1;
	}
}

export default ShadowTeam;
