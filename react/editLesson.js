import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TextInput from "./textInput"

class EditLesson extends React.Component {
	constructor(props) {
		super(props);
        if (process.env.NODE_ENV != 'production') {
            axios.defaults.baseURL = 'http://localhost:9054';
        }
        const { lessonID, lessonName, level, summary, lessonText } = this.props.location.state.lesson;
		this.state = {
			value: '',
			lessonID:  {
				value: lessonID,
				label: 'Lesson ID'
			},
			lessonName: {
				value: lessonName,
				label: 'Lesson Name'
			},
			level: {
				value: level,
				label: 'Level'
			},
			summary:  {
				value: summary,
				label: 'Summary'
			},
			lessonText:  {
				value: lessonText,
				label: 'Lesson Text'
			},
			toCms: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		console.log(name, value, event.target);
		this.setState({
			[name]: {
				...this.state[name], //needed to update state of object
				value
			}
		});
	}

	handleSubmit(event) {
		axios.put('/lesson', {
			lessonID: this.state.lessonID.value,
			lessonName: this.state.lessonName.value,
			level: this.state.level.value,
			summary: this.state.summary.value,
			lessonText: this.state.lessonText.value
		}).then((result) => {
			console.log(result);
			this.setState({
				loginResponse: result.data,
				toCms: true
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

		if (this.state.toCms == true) {
            return <Redirect to="addLesson"/>
		}
		
		return (
			<div>
				<div className="back-link"><Link to="mainCms">&lt; Back to List</Link></div>
				<form onSubmit={this.handleSubmit}>

					<TextInput name="lessonID"
						label={this.state.lessonID.label}
						value={this.state.lessonID.value}
						onChange={this.handleChange}
					/>
					<TextInput name="lessonName"
						label={this.state.lessonName.label}
						value={this.state.lessonName.value}
						onChange={this.handleChange}
					/>
					<TextInput name="level"
						label={this.state.level.label}
						value={this.state.level.value}
						onChange={this.handleChange}
					/>
					<TextInput name="summary"
						label={this.state.summary.label}
						value={this.state.summary.value}
						onChange={this.handleChange}
					/>
					<TextInput name="lessonText"
						label={this.state.lessonText.label}
						value={this.state.lessonText.value}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default EditLesson;