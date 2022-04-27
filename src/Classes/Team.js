import ShadowTeam from './shadowTeam';
//this class makes teams
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
	//this method add members to the team
	addMember(member) {
		if (this.teamMembers.length < 3) {
			this.teamMembers.push(member);
			this.averageTrophies =
				this.teamMembers.reduce((p, e) => p + e.trophies, 0) / this.teamMembers.length;
		}
	}
}
export default Team;
