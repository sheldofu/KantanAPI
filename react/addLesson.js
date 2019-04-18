import React from "react";
import axios from "axios";
//import { Redirect } from "react-router-dom";

class AddLesson extends React.Component {
	constructor(props) {
		super(props);
		axios.defaults.baseURL = 'http://localhost:9054';
		this.state = {
			value: '',
			lessonID: '',
			lessonName: '',
			level: '',
			summary: '',
			lessonText: ''
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
		axios.post('/lesson', {
			lessonID: this.state.lessonID,
			lessonName: this.state.lessonName,
			level: this.state.level,
			summary: this.state.summary,
			lessonText: this.state.lessonText
		}).then((result) => {
			console.log(result);
			this.setState({
				loginResponse: result.data
			});
			if (result.data.success == true) {
				console.log('post success');
			}
		}).catch((error) => {
			console.log(error);
		});
			event.preventDefault();
	}

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Lesson ID
					<input type="text" name="lessonID" value={this.state.username} onChange={this.handleChange} />
				</label>
				<label>
					Lesson Name
					<input type="text" name="lessonName" value={this.state.password} onChange={this.handleChange} />
				</label>
				<label>
					Level
					<input type="text" name="level" value={this.state.username} onChange={this.handleChange} />
				</label>
				<label>
					Summary
					<input type="text" name="summary" value={this.state.password} onChange={this.handleChange} />
				</label>
				<label>
					Lesson Text
					<input type="text" name="lessonText" value={this.state.password} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default AddLesson;