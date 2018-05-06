import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    console.log('this.state.dueDate', this.state.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  clearReminders() {
    this.props.clearReminders();
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-12">
        {
          reminders.map(reminder => {
            return (
              <li key={ reminder.id } className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
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

  render() {

    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>

        <div className="form-inline">
          <div className="form-group">

            <input
              className="form-control"
              placeholder="I have to..."
              onChange={event => this.setState({text: event.target.value})}
            />

            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({dueDate: event.target.value})}
            />

            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.addReminder()}>
              Add Reminder
            </button>

          </div>

          <div className="reminder-form">
            { this.renderReminders() }

            <button
              className="btn btn-danger"
              onClick={() => this.clearReminders()}
            >
               Clear Reminders
             </button>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
