import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';
import { TournamentPage, EditTournamentPage } from './Pages/TournamentPage';
import tester from './Classes/TestClasses';

import { Login, Signup, Start } from './login';
import { Choose, New, Overview } from './overview';
import { Add } from './players';
import { AddOne } from './player';
import { Bracket } from './bracket'
import { ShowTournamentPage } from './Pages/ShowTournamentPage';

class Home extends Component {
	render() {
		return <div>Hjemmeside</div>;
	}
}

class Page1 extends Component {
	render() {
		return <div>Page 1</div>;
	}
}

class Page2 extends Component {
	render() {
		return <div>Page 2</div>;
	}
}

ReactDOM.render(
	<HashRouter>
		<div>
			<Start />
			<Route exact path="/" component={Login} />
			<Route exact path="/page1" component={Page1} />
			<Route exact path="/tournamentPage/:TournamentID" component={TournamentPage} />
			<Route
				exact
				path="/tournamentPage/:TournamentID/:TournamentID"
				component={ShowTournamentPage}
			/>
			<Route exact path="/matches/:MatchID/edit" component={EditTournamentPage} />
			<Route exact path="/page2" component={Page2} />

			<Route exact path="/login" component={Login} />
			<Route exact path="/signup" component={Signup} />

			<Route exact path="/new" component={New} />
			<Route exact path="/overview" component={Overview} />
			<Route exact path="/choose" component={Choose} />

			<Route exact path="/players/1" component={Add} />
			<Route exact path="/players/0" component={AddOne} />

			<Route exact path="/bracket" component={Bracket} />
		</div>
	</HashRouter>,
	document.getElementById('root')
);
