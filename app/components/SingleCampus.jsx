import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCampus } from '../reducers/campuses';

export class SingleCampus extends Component {

    componentDidMount() {
        const singleCampusId = this.props.match.params.id;
        this.props.getCampus(singleCampusId);
    }

    render() {
        const singleCampus = this.props.campus;
        const students = this.props.students;
        return (
            <div className="singleCampus">
                <div>
                    <h3>{singleCampus.name}</h3>
                    <img src={singleCampus.img} className="img-thumbnail" />
                    <h5>
                        {
                            students.map(student => {
                                let studentLink = `/students/${student.id}`
                                if (student.campusId === singleCampus.id) {
                                    return (
                                        <Link to={studentLink} key={student.id}>
                                            <h3>{student.name}</h3>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </h5>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        campus: state.campuses.campus,
        campuses: state.campuses.campuses,
        students: state.students.students
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCampus: (campusId) => {
            dispatch(fetchCampus(campusId))
        }
    }
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
