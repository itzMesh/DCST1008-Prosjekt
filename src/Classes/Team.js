import ShadowTeam from './shadowTeam';

class Team extends ShadowTeam {
	teamMembers = [];
	id;
	score = [];
	pointDifference = [];
	name;
	averageTrophies;

	constructor(name, id, tournamentID) {
		super(tournamentID);
		this.name = name;
		this.id = id;
	}

	addMember(member) {
		if (this.teamMembers.length < 3) {
			this.teamMembers.push(member);
			this.averageTrophies =
				this.teamMembers.reduce((p, e) => p + e.trophies, 0) / this.teamMembers.length;
		}
	}
}
export default Team;
