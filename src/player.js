import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';

export class AddOne extends Component {
	team = '';
	name1 = '';
	trophies1 = '';
	teams = [];
	form = null;

	render() {
		return (
			<div>
				<form ref={(instance) => (this.form = instance)}>
					<br />
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
					<br />
					<button type="button" onClick={this.buttonClicked}>
						Add team
					</button>
				</form>
				<NavLink to="/bracket">
					<button
						style={{
							backgroundColor: 'blue',
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
							<em key={1}>
								Name: {team[1][0]} Trophies {team[1][1]}
							</em>

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

    this.name1 = '';
		this.trophies1 = '';
	}
}
