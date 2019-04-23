import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login";
import MainCms from "./mainCms";
import AddLesson from "./addLesson";
import EditLesson from "./editLesson";

class Routing extends React.Component {

    render(){
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/mainCms" component={MainCms} />
                <Route path="/addLesson" component={AddLesson} />
                <Route path="/editLesson" component={EditLesson} />
            </Router>
        )
    }
}

export default Routing;