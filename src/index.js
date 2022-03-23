import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';

import { Login, Signup, Start } from './login';
import { Choose, New, Overview } from './overview';


// class Menu extends Component {
//   	render() {
//     	return (
//       		<div>
//         		Menu:
//         		<NavLink to="/">Home page</NavLink>
//         		<NavLink to="/page1">Page 1</NavLink>
//         		<NavLink to="/page2">Page 2</NavLink>

//       		</div>
//     	);
//   	}
// }

class Home extends Component {
  	render() {
    	return <div>Home</div>;
  	}
}


ReactDOM.render(
  	<HashRouter>
    	<div>
      		<Start />		  

						<Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <Route exact path="/new" component={New} />
            <Route exact path="/overview" component={Overview} />
            <Route exact path="/choose" component={Choose} />
    	</div>
  	</HashRouter>,
  	document.getElementById('root')	
);
