import { combineReducers } from 'redux';
import {getCampus, GOT_CAMPUSES_FROM_SERVER} from '../actions/actions';

const initialState = {
  campus: [],
  students: []
}

const rootReducer = function(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      newState.campus = action.campus;
      break;
    default: return state
  }
  return newState;
};

export default rootReducer
