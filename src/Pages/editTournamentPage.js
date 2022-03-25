import * as React from 'react';
import { Component } from 'react-simplified';
import { editService } from '../Classes/editService';

export class EditTournamentPage extends Component {
	match = null;

	render() {
		if (!this.match) return null;

		return (
			<div>
				<ul>
					<li>
						Completed:{' '}
						<input
							type="text"
							value={this.match.Completed}
							onChange={(event) => (this.match.Completed = event.currentTarget.value)}
						/>
					</li>
					<li>
						Team 1 Score:{' '}
						<input
							type="number"
							value={this.match.Team1Score}
							onChange={(event) =>
								(this.match.Team1Score = event.currentTarget.value)
							}
						/>
					</li>
					<li>
						Team 2 Score:{' '}
						<input
							type="number"
							value={this.match.Team2Score}
							onChange={(event) =>
								(this.match.Team2Score = event.currentTarget.value)
							}
						/>
					</li>
				</ul>
				<button type="button" onClick={this.save}>
					Save
				</button>
			</div>
		);
	}

	mounted() {
		editService.getWinner(this.props.match.params.MatchID, (match) => {
			this.match = match;
		});
	}

	save() {
		editService.updateWinner(this.match, () => {
			history.push('/matches/' + this.match.MatchID);
		});
	}
}
