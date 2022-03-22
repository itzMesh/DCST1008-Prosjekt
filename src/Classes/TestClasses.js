import Team from './Team';
import Torunament from './Tournament';
import TeamMember from './TeamMember';

function tester() {
	let torunamentTest = new Torunament();
	let teamlist = [];

	for (let i = 0; i < 10; i++) {
		let tro = Math.floor(Math.random() * 2000);
		let membera = new TeamMember('Per', tro, 'Code Testers');
		let teama = new Team(membera);
		teamlist.push(teama);
	}
	torunamentTest.teams = teamlist;
	torunamentTest.createBrackets();
}

export default tester;
