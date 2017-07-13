import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { createNewCampus, destroyCampus } from '../reducers/campuses';

export class Campus extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        const deleteCampus = this.props.deleteCampus;
        const campuses = this.props.campuses;
        return (
            <div className="row">
                <div>
                    {this.renderNewCampus()}
                </div>
                <ul>
                    {campuses && campuses.map(campus => {
                        let campusId = `/campus/${campus.id}`
                        return (
                            <div className="col-xs-4" key={campus.id}>
                                <Link to={campusId} className="thumbnail" >
                                    <div className="caption">
                                        <span>{campus.name}</span>
                                    </div>
                                </Link>
                                <img src={campus.img} />
                                <button
                                    onClick={() => deleteCampus(campus.id)}
                                    type="submit"
                                    className="btn btn-warning btn-xs">
                                    <span className="glyphicon glyphicon-remove" />X
                                </button>
                            </div>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }

    renderNewCampus() {
        return (
            <form onSubmit={this.onSubmit} className="list-group-item ">
                <ul className="list-inline">
                    <li>
                        <input
                            name="name"
                            type="text"
                            className="form-like large-font"
                            placeholder="Campus Name"
                        />
                        <input
                            name="img"
                            type="text"
                            className="form-like large-font"
                            placeholder="Campus Image URL"
                        />
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
        const addCampus = this.props.addCampus;
        event.preventDefault();
        const newCampus = {
            name: event.target.name.value,
            img: event.target.img.value
        }
        addCampus(newCampus);
    }

}

function mapStateToProps(state) {
    return {
        campuses: state.campuses.campuses,
        students: state.students.students,
        campus: state.campuses.campus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCampus: (campus) => {
            dispatch(createNewCampus(campus));
        },
        deleteCampus: (id) => {
            dispatch(destroyCampus(id));
        }
    }
}

const CampusContainer = connect(mapStateToProps, mapDispatchToProps)(Campus);

export default CampusContainer;
