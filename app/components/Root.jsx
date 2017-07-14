import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Campus from './Campus';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import store from '../store';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import { fetchStudents } from '../reducers/students';
import { fetchCampuses } from '../reducers/campuses';


export class Root extends Component {

    componentDidMount() {
        this.props.getInitialData();
    }

    render() {
        return (
            <Router>
                <div className="App">

                    <div className="Campus">
                        <h3>ハミルトンのジャバスクリプトアカデミー</h3>
                    </div>
                    <div className="container Campus-students">
                        <div className="row">
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/campus">HOME</a>
                            <a className="btn-flat btn-xs-6 .col-md-4" href="/students">STUDENTS</a>
                        </div>
                    </div>

                    <div className="App-content container-fluid">
                        <Switch>
                            <Route
                                exact path="/campus"
                                component={Campus}
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
                                component={Campus}
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

const mapStateToProps =  null;

const mapDispatchToProps = (dispatch) => ({
    getInitialData: () => {
        dispatch(fetchCampuses());
        dispatch(fetchStudents());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
