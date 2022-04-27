import GeneralSettings from '../Classes/GeneralSettings';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import Torunament from '../Classes/tournament';

//Testing the action of new Tournament

let settings = new GeneralSettings();

settings.name = 'Test tournament';
settings.gamemode = '1v1';
settings.type = 'bracket';

//Testing the action of addSinglePlayer/addTwoPlayerTeams

function createTeam(array, teamID, tournamentID) {
	let aTeam = new Team('teamName', teamID, tournamentID);
	aTeam.addMember(
		new TeamMember('name1', Math.floor(Math.random() * 8154), teamID, tournamentID)
	);
	array.push(aTeam);
}

let teamArray = [];
for (let i = 0; i < 3; i++) {
	createTeam(teamArray, i, 2);
}
let tournament = new Torunament(settings.name, 2, teamArray, settings);

test('Tests if the correct amount of rounds and matches is added to tournament', () => {
	expect(tournament.rounds.length).toBe(2);
	expect(tournament.rounds[0].matches.length).toBe(2);
	expect(tournament.rounds[1].matches.length).toBe(1);
	expect(tournament.hasBronze).toBe(false);
});

//Test the functionality of editTournament page

tournament.rounds[0].matches[1].updateScore(1, 0);
for (let i = 0; i < 1; i++) {
	tournament.rounds[1].matches[i].updateScore(1, 0);
}

test('Check if winner is corect', () => {
	expect(tournament.winner).toBe(
		teamArray.sort((a, b) => b.averageTrophies - a.averageTrophies)[0]
	);
});
