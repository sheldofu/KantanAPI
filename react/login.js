import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
	
	constructor(props) {
		super(props);
        if (process.env.NODE_ENV != 'production') {
            axios.defaults.baseURL = 'http://localhost:9054';
        }
		this.state = {
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
			this.setState({
				loginResponse: result.data
			});
			if (result.data.success == true) {
				localStorage.setItem('token', result.data.token);
				axios.defaults.headers.common['authorization'] = result.data.token;
			}
		}).catch((error) => {
			console.log(error);
		});
		event.preventDefault();
	}

	render() {

		if (this.state.loginResponse.success == true) {
			return <Redirect to='mainCms' />
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Username
					<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
				</label>
				<label>
					Password
					<input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
				<h1>{this.state.loginResponse.message}</h1>
			</form>
		);
	}
}

export default LoginForm;