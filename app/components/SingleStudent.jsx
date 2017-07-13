import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchStudent } from '../reducers/students';

export class SingleStudent extends Component {

    componentDidMount() {
        const singleStudentId = this.props.match.params.id;
        this.props.getStudent(singleStudentId);
    }

    render() {
        const singleStudent = this.props.student;
        const campuses = this.props.campuses;
        const singleCampusName = campuses.map(campus => {
            if (campus.id === singleStudent.campusId) {
                return campus.name;
            }
        })
        const campusLink = `/campus/${singleStudent.campusId}`;
        return (
            <div className="singleStudent">
                <div>
                    <h3>{singleStudent.name}</h3>
                    <h4>{singleStudent.email}</h4>
                    <h5>
                        <Link to={campusLink}>
                            <h3>{singleCampusName}</h3>
                        </Link>
                         ^Click Here to See Campus!^
                    </h5>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        student: state.students.student,
        campuses: state.campuses.campuses,
        students: state.students.students
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStudent: (studentId) => {
            dispatch(fetchStudent(studentId))
        }
    }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
