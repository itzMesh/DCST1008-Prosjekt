import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


export class Choose extends Component {
  render() {
    return (
        <div>
          <br/> Overview of Tournaments <br/>

          <NavLink to="/tournamentPage">Tournament 1<br/><br/></NavLink>


          <NavLink to="/new">New tournament</NavLink>
        </div>
    );
  }
}

export class New extends Component {


  render() {
    return <div>

      <br/>Select tournament type 

        <select value={this.name} onChange={(event) => (this.name = event.currentTarget.value)}>
          <option value="bracket">Bracket</option>
          <option value="roundrobin">Round robin</option>
        </select><br/><br/>

        Select match type 

        <select value={this.name} onChange={(event) => (this.name = event.currentTarget.value)}>
          <option value="">1v1</option>
          <option value="">2v2 - Generated teams</option>
          <option value="">2v2 - Custom Teams</option>
          <option value="">1v1 Double Elixir</option>
          <option value="">2v2 - Double </option>
          <option value="">Round robin</option>
        </select><br/><br/>
      
    </div>;
  }
}


export class Overview extends Component {
  render() {
    return <div>Overview</div>;
  }
}
