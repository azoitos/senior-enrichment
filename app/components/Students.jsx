import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { createStudent, destroyStudent } from '../reducers/students';

export class Students extends Component {
    render() {
        const students = this.props.students;
        const campuses = this.props.campuses;
        const deleteStudent = this.props.deleteStudent;
        return (
            <div className="row">
                <div>
                    {this.renderNewStudent()}
                </div>
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
                                        <button
                                            onClick={() => deleteStudent(student.id)}
                                            type="submit"
                                            className="btn btn-warning btn-xs">
                                            <span className="glyphicon glyphicon-remove" />X
                                </button>
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

    renderNewStudent() {
        return (
            <form onSubmit={this.onSubmit} className="list-group-item ">
                <ul className="list-inline">
                    <li>
                        <input
                            name="name"
                            type="text"
                            className="form-like large-font"
                            placeholder="Student Name"

                        />
                        <input
                            name="email"
                            type="text"
                            className="form-like large-font"
                            placeholder="Student Email"
                        />
                        <label>Select a Campus</label>
                        <select>
                            <option>Hello</option>
                        </select>
                    </li>
                </ul>
                <button
                    type="submit"
                    className="btn btn-warning btn-xs">
                    <span className="glyphicon glyphicon-plus" />SUBMIT
                </button>
            </form>
        );
    }
    onSubmit(event) {
        const addStudent = this.props.addStudent;
        event.preventDefault();
        const newStudent = {
            name: event.target.name.value,
            email: event.target.email.value
        }
        addStudent(newStudent);
    }
}

function mapStateToProps(state) {
    return {
        students: state.students.students,
        campuses: state.campuses.campuses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addStudent: (student) => {
            dispatch(createStudent(student));
        },
        deleteStudent: (id) => {
            dispatch(destroyStudent(id));
        }
    }
}

const StudentContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentContainer;
