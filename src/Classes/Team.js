import ShadowTeam from './ShadowTeam';
import TeamMember from './TeamMember';

class Team extends ShadowTeam {
	teamMembers = [];
	constructor(member1, member2, name) {
		super();
		if (member2 == undefined) {
			this.averageTrophies = member1.trophies;
			this.teamMembers[0] = member1;
			this.teamName = member1.name;
		} else {
			this.averageTrophies = (member1.trophies + member2.trophies) / 2;
			this.teamMembers[0] = member1;
			this.teamMembers[1] = member2;
			this.teamName = name;
		}
	}
}

export default Team;
