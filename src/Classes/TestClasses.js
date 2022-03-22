import Team from './Team';
import Torunament from './Tournament';
import TeamMember from './TeamMember';

function tester() {
	let torunamentTest = new Torunament();
	let teamlist = [];

	function addPlayer(name, trophies) {
		teamlist.push(new Team(new TeamMember(name, trophies, 'The Code Testers')));
	}

	addPlayer('Jo', 2000);
	addPlayer('Nicolai', 12);
	addPlayer('Martin', 5000);
	addPlayer('Mathias', 1);
	addPlayer('Bjørn', 0);
	addPlayer('Eirik', 6000);
	addPlayer('Kjell', 987);
	addPlayer('Håkon', 7000);
	addPlayer('Odin', 1483);
	addPlayer('mrBean', 40);
	addPlayer('asd', 921);
	addPlayer('Tom Scott', 1298);
	addPlayer('Åge', 1234);
	addPlayer('Arne', 987);
	addPlayer('Luddwig', 987);
	addPlayer('Atrioc', 1489);
	addPlayer('Stanz', 42);

	torunamentTest.teams = teamlist;
	torunamentTest.createBrackets();

	torunamentTest.rounds[0].matches[1].updateScore(2, 0);

	torunamentTest.rounds[1].matches[0].updateScore(2, 0);
	torunamentTest.rounds[1].matches[1].updateScore(2, 3);
	torunamentTest.rounds[1].matches[2].updateScore(2, 3);
	torunamentTest.rounds[1].matches[3].updateScore(2, 1);
	torunamentTest.rounds[1].matches[4].updateScore(2, 0);
	torunamentTest.rounds[1].matches[5].updateScore(1, 0);
	torunamentTest.rounds[1].matches[6].updateScore(1, 0);
	torunamentTest.rounds[1].matches[7].updateScore(2, 3);

	torunamentTest.rounds[2].matches[0].updateScore(3, 0);
	torunamentTest.rounds[2].matches[1].updateScore(2, 1);
	torunamentTest.rounds[2].matches[2].updateScore(3, 2);
	torunamentTest.rounds[2].matches[3].updateScore(2, 1);

	torunamentTest.rounds[3].matches[0].updateScore(2, 1);
	torunamentTest.rounds[3].matches[1].updateScore(1, 0);

	torunamentTest.rounds[4].matches[0].updateScore(1, 0);

	console.log(torunamentTest);
}

export default tester;
