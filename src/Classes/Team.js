import ShadowTeam from './ShadowTeam';

class Team extends ShadowTeam {
	constructor(member1,member2,name){
		this.averageTrophies=(member1.trophies+member2.trophies)/2
		this.teamMembers[0]=member1
		this.teamMembers[1]=member2
		this.teamName=name
	}
	constructor(member){
		this.averageTrophies=member.trophies
		this.teamMembers[0]=member
		this.teamName=member.name
	}
}

export default Team