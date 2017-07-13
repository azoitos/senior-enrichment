import { combineReducers } from 'redux';
import {GOT_STUDENTS_FROM_SERVER, GOT_SINGLE_STUDENT_FROM_SERVER} from '../actions/students';
import {GOT_CAMPUSES_FROM_SERVER, GOT_CAMPUS_FROM_SERVER} from '../actions/campuses';

const initialState = {
  campuses: [],
  students: [],
  campus: '',
  student: ''
}

const rootReducer = function(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {

    case GOT_CAMPUSES_FROM_SERVER:
      newState.campuses = action.campuses;
      break;

    case GOT_STUDENTS_FROM_SERVER:
      newState.students = action.students;
      break;

    case GOT_CAMPUS_FROM_SERVER:
      newState.campus = action.campus;
      break;

    case GOT_SINGLE_STUDENT_FROM_SERVER:
      newState.student = action.student;
      break;

    default: return state
  }
  return newState;
};

export default rootReducer;
