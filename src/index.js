import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';
import { TournamentPage, EditTournamentPage } from './Pages/tournamentPage';
import tester from './Classes/testClasses';

import { Login} from './Pages/login';
import { Menu } from './Pages/menu';
import { Signup} from './Pages/signup';
import { Choose, New, Overview } from './Pages/overview';
import { Add } from './players';
import { AddOne } from './Pages/addSinglePlayer';
import { ShowTournamentPage } from './Pages/showTournamentPage';



ReactDOM.render(
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
			<Route exact path="/matches/:MatchID/edit" component={EditTournamentPage} />

			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />

			<Route exact path="/new" component={New} />
			<Route exact path="/overview" component={Overview} />
			<Route exact path="/choose" component={Choose} />

			<Route exact path="/players/1" component={Add} />
			<Route exact path="/players/0" component={AddOne} />
		</div>
	</HashRouter>,
	document.getElementById('root')
);
