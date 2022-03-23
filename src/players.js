import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


export class Add extends Component {
  name = '';
  trophies = '';
  team = '';
  form = null;

  render() {
    return (
      <form ref={(instance) => (this.form = instance)}>
        <br /><input
          type="text"
          value={this.team}
          placeholder="Team name"
          size = '25x'
          onChange={(event) => (this.team = event.currentTarget.value)}
          required
        />
        <br /><input
          type="text"
          value={this.name}
          placeholder="Nickname"
          size = '10'
          onChange={(event) => (this.name = event.currentTarget.value)}
          required
        />
        <input
          type="text"
          value={this.trophies}
          placeholder="Trophies"
          size = '10'
          onChange={(event) => (this.trophies = event.currentTarget.value)}
          required
        />

        <br/><br/><button type="button" onClick={this.buttonClicked}>
          Add team
        </button>
      </form>
    );
  }

  buttonClicked() {
    if (!this.form.reportValidity()) return;

    let ny = React.createElement("div", {}, "Team: " + this.team + ' Name: ' + this.name + ' Trophies ' + this.trophies)
    
    let nytt = document.createElement("div")
    nytt.id = 'nytt';
    document.body.appendChild(nytt);

    ReactDOM.render(
      ny,
      document.getElementById('nytt')
    );

  }
}




