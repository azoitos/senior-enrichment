import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCampuses } from '../actions/campuses';

export class Campus extends Component {

    render() {
        const campuses = this.props.campuses;
        return (
            <div className="row">
                <ul>
                    {campuses && campuses.map(campus => {
                        let campusId = `/campus/${campus.id}`
                        return (
                            <div className="col-xs-4" key={campus.id}>
                                <Link to={campusId} className="thumbnail" >
                                    <img src={campus.img} />
                                    <div className="caption">
                                        <span>{campus.name}</span>
                                    </div>
                                </Link>
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
        campuses: state.campuses,
        students: state.students
    }
}

const CampusContainer = connect(mapStateToProps)(Campus);

export default CampusContainer;
