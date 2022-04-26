import GeneralSettings from '../Classes/GeneralSettings';
import Team from '../Classes/team';
import TeamMember from '../Classes/teamMember';
import Torunament from '../Classes/tournament';

//Testing the action of new Tournament

let settings = new GeneralSettings();

settings.name = 'Test tournament';
settings.gamemode = '1v1';
settings.type = 'roundrobin';

//Testing the action of addSinglePlayer/addTwoPlayerTeams

function createTeam(array, teamID, tournamentID) {
	let aTeam = new Team('teamName', teamID, tournamentID);
	aTeam.addMember(
		new TeamMember('name1', Math.floor(Math.random() * 8154), teamID, tournamentID)
	);
	array.push(aTeam);
}

let teamArray = [];
for (let i = 0; i < 4; i++) {
	createTeam(teamArray, i, 2);
}
let tournament = new Torunament(settings.name, 2, teamArray, settings);

test('Tests if the correct amount of rounds and matches is added to tournament', () => {
	expect(tournament.rounds.length).toBe(3);
	for (let i = 0; i < 3; i++) {
		expect(tournament.rounds[i].matches.length).toBe(2);
		expect(tournament.hasBronze).toBe(false);
	}
});

//Test the functionality of editTournament page
let bestPlayer = teamArray.sort((a, b) => b.averageTrophies - a.averageTrophies)[0];

for (const round of tournament.rounds) {
	for (const match of round.matches) {
		if (match.teams[0] == bestPlayer) {
			match.updateScore(1, 0);
		} else if (match.teams[1] == bestPlayer) {
			match.updateScore(0, 1);
		} else {
			match.updateScore(1, 1);
		}
	}
}

test('Check if tie is corect', () => {
	expect(tournament.winner).toBe(bestPlayer);
	expect(tournament.tie).toBe(false);
});
