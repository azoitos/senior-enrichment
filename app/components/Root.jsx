import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Home from './Home';
import Students from './Students';


class Main extends Component {


    componentDidMount() {

    }
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="Home">
                        <h3>Welcome</h3>
                    </div>
                    <div className="container home-students">
                        <div className="row">
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/home">HOME</a>
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/students">STUDENTS</a>
                        </div>
                    </div>

                    <div className="App-content container-fluid">
                        <Switch>
                            <Route
                                exact path="/home"
                                render={() =>
                                    <Home />
                                }
                            />
                            <Route
                                path="/students"
                                render={() =>
                                    <Students />
                                }
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
