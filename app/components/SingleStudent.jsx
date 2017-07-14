import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchStudent, studentUpdate } from '../reducers/students';

export class SingleStudent extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        const singleStudent = this.props.student;
        const campuses = this.props.campuses;

        if (singleStudent && campuses) {
            const singleCampusName = campuses.map(campus => {
                if (campus.id === +singleStudent.campusId) {
                    return campus.name;
                }
            })
            const campusLink = `/campus/${singleStudent.campusId}`;
            return (
                <div className="single-student">
                    <ul>
                        <li>Name: {singleStudent.name}</li>
                        <li>Email: {singleStudent.email}</li>
                        <li>Campus:
                            <Link to={campusLink}>
                                <span> {singleCampusName}</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="update-campus"> Update Student Information Below
                        {this.renderUpdatedStudent()}
                    </div>
                </div>
            )
        }
        else {
            return (<div>LOADING</div>)
        }
    }

    renderUpdatedStudent() {
        const campuses = this.props.campuses;
        return (
            <form onSubmit={this.onSubmit} className="list-group-item">
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
                <div>
                    <label>Select a Campus</label>
                    <select name="campusId">
                        {
                            campuses.map(campus => ((<option key={campus.id} value={campus.id}>{campus.name}</option>)))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-warning btn-xs">
                    <span className="glyphicon glyphicon-plus" />Update
                </button>
            </form>
        )
    }

    onSubmit(event) {
        const singleStudent = this.props.student
        event.preventDefault();
        const updatedStudent = {
            name: event.target.name.value || singleStudent.name,
            email: event.target.email.value || singleStudent.email,
            campusId: event.target.campusId.value || singleStudent.campusId
        }
        event.target.name.value = '';
        event.target.email.value = '';
        this.props.studentUpdate(singleStudent.id, updatedStudent);
    }
}

function mapStateToProps(state, componentProps) {
    return {
        student: state.students.find(student => (
            student.id === +componentProps.match.params.id
        )),
        campuses: state.campuses
    }
}


const mapDispatchToProps = ({ studentUpdate, fetchStudent })

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
