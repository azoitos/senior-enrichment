import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createNewCampus, destroyCampus } from '../reducers/campuses';

export class Campus extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        const deleteCampus = this.props.deleteCampus;
        const destroyStudent = this.props.destroyStudent;
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
                            <div key={campus.id} className="col s4">
                                <Link to={campusId} className="thumbnail" >
                                    <h4><span>{campus.name}</span></h4>
                                </Link>
                                <img src={campus.img} />
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
            <form onSubmit={this.onSubmit} className="list-group-item">
                <div className="row">
                    <div className="input-field col s8">
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
                    </div>
                </div>
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
        event.target.name.value = '';
        event.target.img.value = '';
        event.target.placeholder = '';
    }

}

function mapStateToProps(state) {
    return {
        campuses: state.campuses,
        students: state.students,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCampus: (campus) => {
            dispatch(createNewCampus(campus));
        },
        deleteCampus: (id) => {
            dispatch(destroyCampus(id));
        },
        deleteStudent: (id) => {
            dispatch(destroyStudent(id));
        },
    }
}

const CampusContainer = connect(mapStateToProps, mapDispatchToProps)(Campus);

export default CampusContainer;
