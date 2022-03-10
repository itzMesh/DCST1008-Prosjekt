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
    return <div>Home page</div>;
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  </HashRouter>,
  document.getElementById('root')
);
