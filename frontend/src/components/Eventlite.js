import React from "react"
import axios from "axios"

import EventsList from "./EventsList"
import EventForm from "./EventForm"
import FormErrors from "./FormErrors"

import "./Eventlite.css"

class Eventlite extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			events: this.props.events,
			title: { value: "", valid: false },
			start_datetime: { value: "", valid: false },
			location: { value: "", valid: false },
			formErrors: {},
			formValid: false,
		}
	}

	handleInput = e => {
		e.preventDefault()
		const name = e.target.name
		const newState = {}
		newState[name] = { ...this.state[name], value: e.target.value }
		this.setState(newState, this.validateForm)
	}

	handleSubmit = e => {
		e.preventDefault()
		let newEvent = {
			title: this.state.title.value,
			start_datetime: this.state.start_datetime.value,
			location: this.state.location.value},
		}
	}

	addNewEvent = event => {
		const events = [event, ...this.state.events].sort(function (a, b) {
			return new Date(a.start_datetime - b.start_datetime)
		})
		this.setState({ events: events })
	}

	resetFormErrors() {
		this.setState({ formErrors: {} })
	}

	validateForm() {
		let formErrors = {}
		let formValid = true
		if (this.state.title.length <= 2) {
			formErrors.title = ["is too short (minimum is 3 characters)"]
			formValid = false
		}
		if (this.state.location.length === 0) {
			formErrors.location = ["can't be blank"]
			formValid = false
		}
		if (this.state.start_datetime.length === 0) {
			formErrors.start_datetime = ["can't be blank"]
			formValid = false
		} else if (Date.parse(this.state.start_datetime) <= Date.now()) {
			formErrors.start_datetime = ["can't be in the past"]
			formValid = false
		}
		this.setState({ formValid: formValid, formErrors: formErrors })
	}

	componentDidMount() {
		axios({
			method: "GET",
			url: "http://localhost:3001/events",
		})
			.then(response => {
				this.addNewEvent(response.data)
				this.resetFormErrors()
			})
			.catch(error => {
				console.log(error.response.data)
				this.setState({ formErrors: error.response.data })
			})
		e.preventDefault()
	}

	render() {
		return (
			<div>
				<FormErrors formErrors={this.state.formErrors} />
				<EventForm
					handleSubmit={this.handleSubmit}
					handleInput={this.handleInput}
					formValid={this.state.formValid}
					title={this.state.title}
					start_datetime={this.state.start_datetime}
					location={this.state.location}
				/>
				<EventsList events={this.state.events} />
			</div>
		)
	}
}

export default Eventlite
