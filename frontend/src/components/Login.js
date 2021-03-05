import React from "react";
import axios from "axios";

class Login extends React.Component {
	handleLogin = e => {
		e.preventDefault();
		axios({
			method: "POST",
			url: "http://localhost:3001/auth/sign_in",
			data: {
				email: this.email.value,
				password: this.password.value,
			},
		}).then(response => {
			console.log(response);
		});
	};

	render() {
		return (
			<div>
				<h2>Log In</h2>
				<form onSubmit={this.handleLogin}>
					<input name="email" ref={input => (this.email = input)} />
					<input name="password" type="password" ref={input => (this.password = input)} />
					<input type="submit" value="Log in" />
				</form>
			</div>
		);
	}
}

export default Login;
