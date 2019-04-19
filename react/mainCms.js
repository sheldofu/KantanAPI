import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class MainCms extends React.Component{

    constructor(props) {
        super(props);
        if (process.env.NODE_ENV != 'production') {
            axios.defaults.baseURL = 'http://localhost:9054';
        }
        this.state = {
            lessons: []
        }
        this.addLesson = this.addLesson.bind(this);
    }

    componentDidMount() {
        console.log('mounting');
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.get('/lesson')
        .then((result) => {
            this.setState({
                lessons: result.data
            })
        }).catch((error) => {
			console.log("problem", error);
		});
    }

    addLesson() {
        <Redirect to="addLesson"/>
    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.lessons.map((lesson) => <li key="{lesson.lessonID}">{lesson.lessonID}</li>)}
                </ul>
                <div>
                   { <button onClick={this.addLesson}>Add Lesson</button> }
                </div>
            </div>
        );
    }
}

export default MainCms;