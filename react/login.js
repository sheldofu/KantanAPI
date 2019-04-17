import React from "react";
import ReactDOM from "react-dom";

import axios from "axios";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		axios.defaults.baseURL = 'http://localhost:9054';
		this.state = {
			value: '',
			username: '',
			password: '',
			loginResponse: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		axios.post('/token', {
			username: this.state.username,
			password: this.state.password
		}).then((result) => {
			console.log(result);
			if (result.data.success == true) {
				console.log('sucess');
				localStorage.set('token', result.data.token);
				axios.defaults.headers.common['Authorization'] = result.data.token;
			}
			this.setState({
				loginResponse: result.data
			});
		}).catch((error) => {
			console.log(error);
		});
			event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
			<label>Username</label>
			<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
			<label>Password</label>
			<input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
			<input type="submit" value="Submit" />
			<h1>{this.state.loginResponse.message}</h1>
			</form>
		);
	}
}

export default LoginForm;