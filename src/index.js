import * as React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';
import tester from './Classes/testClasses';

import { Signup } from './Pages/signup';
import { Menu } from './Pages/menu';
import { AddSinglePlayer } from './Pages/addSinglePlayer';
import { AddTwoPlayerTeams } from './Pages/addTwoPlayerTeams';
import { EditTournamentPage } from './Pages/editTournamentPage';
import { Login } from './Pages/login';
import { NewTournament } from './Pages/newTournament';
import { Overview } from './Pages/overview';
import { ShowTournamentPage } from './Pages/showTournamentPage';
import { TournamentPage } from './Pages/tournamentPage';
import { Alert } from './widgets';

ReactDOM.render(
	<div>
		<Alert />

		<HashRouter>
			<div>
				<Menu />
				<Route exact path="/" component={Login} />
				<Route exact path="/tournamentPage/:TournamentID" component={TournamentPage} />
				<Route
					exact
					path="/tournamentPage/:TournamentID/:TournamentID"
					component={ShowTournamentPage}
				/>
				<Route exact path="/matches/edit/:Match" component={EditTournamentPage} />

				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />

				<Route exact path="/new" component={NewTournament} />
				<Route exact path="/overview" component={Overview} />

				<Route exact path="/players/1" component={AddTwoPlayerTeams} />
				<Route exact path="/players/0" component={AddSinglePlayer} />
			</div>
		</HashRouter>
	</div>,
	document.getElementById('root')
);
