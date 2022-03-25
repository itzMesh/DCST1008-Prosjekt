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
