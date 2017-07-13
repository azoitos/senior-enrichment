import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux';

export class Students extends Component {
    render() {
        const students = this.props.students;
        const campuses = this.props.campuses;
        return (
            <div className="row">
                <ul>
                    {students.map(student => {
                        let studentId = `/students/${student.id}`
                        return (
                            <div className="col-xs-4" key={student.id}>
                                <div className="caption">
                                    <li>
                                        <Link to={studentId} className="thumbnail" >
                                            <h6>{student.name}</h6>
                                        </Link>
                                        <h6>{student.email}</h6>
                                        <h6>
                                            {campuses && campuses.map(campus => {
                                                if (campus.id === student.campusId) {
                                                    return campus.name
                                                }
                                            })}
                                        </h6>
                                    </li>
                                </div>
                            </div>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const StudentContainer = connect(mapStateToProps)(Students);

export default StudentContainer;
