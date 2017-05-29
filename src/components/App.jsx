import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder } from '../actions';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	updateState(){
		this.setState(
		{
			text: this.refs.inputValue.value
		},
		 this.addReminder
		 );
		this.refs.inputValue.value = '';
	}

	addReminder(){
		this.refs.inputValue.value = '';
		this.props.addReminder(this.state.text);
	}

	deleteReminder(id){
		console.log('in delete func of app');
		this.props.deleteReminder(id);
	}

	renderReminder(){
		const { reminders } = this.props;
		return(
			<ul className="list-group col-sm-2">
				{
					reminders.map(reminder => {
						return(
							<li key={reminder.id} className="list-group-item" style={{left: "-41px"}}>
								<div className="list-item"> { reminder.text }</div>
								<div 
									className="list-item delete-button"
									onClick={() => this.deleteReminder(reminder.id)}
									>
									&#x2715;
								</div>
							</li>
							)
					})
				}
			</ul>
			)
	}

	render(){
		return(
			<div className="App">
				<div className="title">
					Reminder Pro
				</div>
				<div className="form-inline reminder-form">
					<div className="form-group">
						<input
						className="form-control"	
						placeholder="i have to.."
					  onKeyPress={event => {
              if(event.key === 'Enter'){
              	this.setState({text: event.target.value}, this.addReminder);
              }
            }}
            ref="inputValue"
						/>
					</div>
					<button
						type="button"
						className="btn btn-success"
						onClick = {() => this.updateState()}
					>
						Add Reminder
					</button>
				</div>
				{ this.renderReminder() }
			</div>
			);
	}
}
function mapStateToProps(state){
	return{
		reminders: state
	}
}

export default connect(mapStateToProps, { addReminder, deleteReminder })(App); 