import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


export class TournType extends Component {
  render() {
    return (
        <div>    
          Choose
        </div>
    );
  }
}

export class MatchType extends Component {
  render() {
    return <div>New</div>;
  }
}

export class Overview extends Component {
  render() {
    return <div>Overview</div>;
  }
}
