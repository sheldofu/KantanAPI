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
            lessons: [],
            addLesson: false
        }
    }

    componentDidMount() {
        this.getLessons();
    }

    getLessons() {
        console.log("getting lessons");
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
        this.setState({
            addLesson: true
        });        
    }

    deleteLesson(lessonID, event) {
        
        axios.delete('/lesson/' + lessonID,)
        .then((result) => {
            console.log(result);
            this.getLessons();
        }).catch((error) => {
			console.log("problem", error);
        });

        event.preventDefault();
    }

    render() {

        if (this.state.addLesson == true) {
            return <Redirect to="addLesson"/>
        }

        return (            
            <div>
                <ul>
                    { this.state.lessons.length ? this.state.lessons.map((lesson) => 
                        <li key={lesson.lessonID}>
                            <span>{lesson.lessonID} | </span>
                            <span>{lesson.lessonName} | </span>
                            <span>edit | </span>
                            <span onClick={this.deleteLesson.bind(this, lesson.lessonID)}>delete</span>
                        </li>
                    ) : <div>No lessons exist</div> }
                </ul>
                <div>
                   { <button onClick={this.addLesson.bind(this)}>Add Lesson</button> }
                </div>
            </div>
        );
    }
}

export default MainCms;