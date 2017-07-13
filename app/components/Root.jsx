import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from './Home';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import store from '../store';
import NotFound from './NotFound';
import {fetchStudents} from '../actions/students';
import {fetchCampuses} from '../actions/campuses';


export default class Root extends Component {

    componentDidMount(){
        store.dispatch(fetchStudents());
        store.dispatch(fetchCampuses());
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="Home">
                        <h3>CollegeBored.edm</h3>
                    </div>
                    <div className="container home-students">
                        <div className="row">
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/campus">HOME</a>
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/students">STUDENTS</a>
                        </div>
                    </div>

                    <div className="App-content container-fluid">
                        <Switch>
                            <Route
                                exact path="/campus"
                                component={Home}
                            />
                            <Route
                                path="/campus/:id"
                                component={SingleCampus}
                            />
                            <Route
                                exact path="/students"
                                component={Students}
                            />
                            <Route
                                path="/students/:id"
                                component={SingleStudent}
                            />
                            <Route
                                exact path="/"
                                component={Home}
                            />
                            <Route
                                component={NotFound}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}
