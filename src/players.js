import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

export class Add extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	name2 = '';
	trophies2 = '';
	teams = [];
	form = null;

	render() {
		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
					<input
						type="text"
						value={this.team}
						placeholder="Team name"
						size="25x"
						onChange={(event) => (this.team = event.currentTarget.value)}
						required
					/>
					<br /> Player 1
					<input
						type="text"
						value={this.name1}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name1 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies1}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies1 = event.currentTarget.value)}
						required
					/>
					<br />
					Player 2
					<input
						type="text"
						value={this.name2}
						placeholder="Nickname"
						size="10"
						onChange={(event) => (this.name2 = event.currentTarget.value)}
						required
					/>
					<input
						type="number"
						value={this.trophies2}
						placeholder="Trophies"
						size="10"
						onChange={(event) => (this.trophies2 = event.currentTarget.value)}
						required
					/>
					<br />
					<br />
					<button type="button" onClick={this.buttonClicked}>
						Add team
					</button>
				</form>
				<NavLink to="/bracket">
					<button
						style={{
							backgroundColor: 'red',
							size: 'large',
							marginLeft: '700px',
							marginTop: '10px',
							height: '40px',
							width: '100px',
						}}
						type="button"
					>
						Create Tournament
					</button>
				</NavLink>
				<br />
				<div>
					{this.teams.map((team, i) => (
						<div key={i} style={{ float: 'left' }}>
							<div key={0}>Team: {team[0]}</div>
							<div key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</div>
							<div key={2}>
								Name: {team[2][0]} Trophies {team[2][1]}
							</div>
							<button
								type="button"
								id={i}
								onClick={(i) => this.teams.splice(i.target.id, 1)}
							>
								x
							</button>
							<br />
							<br />
						</div>
					))}
				</div>
			</div>
		);
	}

	buttonClicked() {
	  // if (!this.form.reportValidity()) return;  
    
		this.teams.push([this.team, [this.name1, this.trophies1], [this.name2, this.trophies2]]);

		this.team = '';
		this.name1 = '';
		this.trophies1 = '';
		this.name2 = '';
		this.trophies2 = '';
	}
}
