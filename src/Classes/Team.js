import ShadowTeam from './ShadowTeam';

class Team extends ShadowTeam {
	teamMembers = [];
	constructor(name, id) {
		super();
		this.name = name;
		this.id == id;
	}

	addMember(member) {
		if (teamMembers < 2) {
			this.teamMembers.push(member);
		}
	}
}
export default Team;
