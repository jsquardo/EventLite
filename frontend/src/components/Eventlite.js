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
			events: [],
			title: "",
			start_datetime: "",
			location: "",
			formErrors: {},
		}
	}

	handleInput = e => {
		e.preventDefault()
		const name = e.target.name
		const value = e.target.value
		const newState = {}
		newState[name] = { ...this.state[name], value: value }
		this.setState(newState)
	}

	handleSubmit = e => {
		e.preventDefault()
		let newEvent = {
			title: this.state.title,
			start_datetime: this.state.start_datetime,
			location: this.state.location,
			data: { events: this.state.events },
		}
	}

	resetFormErrors() {
		this.setState({ formErrors: {} })
	}

	addNewEvent = event => {
		const events = [...this.state.events, event].sort(function (a, b) {
			return new Date(a.start_datetime) - new Date(b.start_datetime)
		})
		this.setState({ events: events })
	}

	componentDidMount() {
		axios({
			method: "GET",
			url: "http://localhost:3001/events",
		}).then(response => {
			this.setState({ events: response.data })
		})
	}

	render() {
		return (
			<div>
				<FormErrors formErrors={this.state.formErrors} />
				<EventForm
					handleSubmit={this.handleSubmit}
					handleInput={this.handleInput}
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
