import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { campusUpdate, destroyCampus } from '../reducers/campuses';

export class SingleCampus extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        const singleCampus = this.props.campus;
        const students = this.props.students;
        const destroyCampus = this.props.destroyCampus;
        if (singleCampus && students) {
            return (
                <div className="singleCampus">
                    <div>
                        <h3>{singleCampus.name}</h3>
                        <img src={singleCampus.img} className="img-thumbnail" />
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map(student => {
                                        let studentLink = `/students/${student.id}`
                                        if (student.campusId === singleCampus.id) {
                                            return (
                                                <tr key={student.id}>
                                                    <td><Link to={studentLink}>{student.name} </Link></td>
                                                    <td>{student.email}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                        <button
                            onClick={() => {
                                destroyCampus(singleCampus.id)
                                this.props.history.push('/campus')
                            }}
                            type="submit"
                            className="btn btn-warning btn-xs remove-button">
                            <span className="glyphicon glyphicon-remove" />Remove Campus
                        </button>
                    </div>
                    <div className="update-campus"> Update Campus Information Below
                        {this.renderUpdatedCampus()}
                    </div>
                </div>
            )
        }
        else {
            return (<div>LOADINGGGG</div>)
        }
    }
    renderUpdatedCampus() {
        return (
            <form onSubmit={this.onSubmit} className="list-group-item">
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
                    placeholder="Campus Image"
                />
                <button
                    type="submit"
                    className="btn btn-warning btn-xs">
                    <span className="glyphicon glyphicon-plus" />Update
                </button>
            </form>
        )
    }
    onSubmit(event) {
        const singleCampus = this.props.campus
        event.preventDefault();
        const updatedCampus = {
            name: event.target.name.value || singleCampus.name,
            img: event.target.img.value || singleCampus.img,
        }
        this.props.campusUpdate(singleCampus.id, updatedCampus);
        event.target.name.value = '';
        event.target.img.value = '';
    }
}

function mapStateToProps(state, componentProps) {
    return {
        campus: state.campuses.find(campus => (
            campus.id === +componentProps.match.params.id
        )),
        students: state.students
    }
}


const mapDispatchToProps = ({ campusUpdate, destroyCampus })

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
