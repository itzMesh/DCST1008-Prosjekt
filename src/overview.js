import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


export class Choose extends Component {
  render() {
    return (
        <div>
          <br/> Overview of Tournaments <br/>

          <NavLink to="/overview">Tournament 1 ...<br/><br/></NavLink>


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
          <option value="Kari">Kari</option>
          <option value="Ola">Ola</option>
          <option value="Eli">Eli</option>
        </select>
      
    </div>;
  }
}


export class Overview extends Component {
  render() {
    return <div>Overview</div>;
  }
}
