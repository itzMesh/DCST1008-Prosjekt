import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Routes, Route } from 'react-router-dom';

class Menu extends Component {
  	render() {
    	return (
      		<div>
        		Menu:
        		<NavLink to="/">Home page</NavLink>
        		<NavLink to="/page1">Page 1</NavLink>
        		<NavLink to="/page2">Page 2</NavLink>
      		</div>
    	);
  	}
}

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
      		<Menu />		
        		<Route exact path="/" component={Home} />
        		<Route exact path="/page1" component={Page1} />
     			  <Route exact path="/page2" component={Page2} />  
    	</div>
  	</HashRouter>,
  	document.getElementById('root')
);
