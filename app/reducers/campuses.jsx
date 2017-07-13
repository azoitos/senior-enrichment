import axios from 'axios';

const initialState = {
    campuses: [],
    campus: '',
}

//---------------ACTION TYPES---------------------//
export const INITIALIZE_CAMPUSES = 'INITIALIZE_CAMPUSES';
export const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';
export const ADD_CAMPUS = 'ADD_CAMPUS';
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS';


//----------------ACTION CREATORS---------------//
export function initCampus(campuses) {
    return {
        type: INITIALIZE_CAMPUSES,
        campuses
    }
}

export function getCampus(campus) {
    return {
        type: GOT_CAMPUS_FROM_SERVER,
        campus
    }
}

export function addCampus(campus) {
    return {
        type: ADD_CAMPUS,
        campus
    }
}

export function removeCampus(id) {
    return {
        type: REMOVE_CAMPUS,
        id
    }
}

//-------------REDUCER------------------//
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case INITIALIZE_CAMPUSES:
            newState.campuses = action.campuses;
            break;

        case GOT_CAMPUS_FROM_SERVER:
            newState.campus = action.campus;
            break;

        case ADD_CAMPUS:
            newState.campus = action.campus;
            break;

        case REMOVE_CAMPUS:
            newState.campuses = newState.campuses.filter(campus => campus.id !== action.id);
            break;

        default: return state
    }
    return newState;
}


//-------------THUNK CREATORS--------------------//
export function fetchCampuses() {
    return function thunk(dispatch) {
        axios.get('/api/campus')
            .then(res => dispatch(initCampus(res.data)))
            .catch(console.error);
    }
}


export function fetchCampus(id) {
    return function thunk(dispatch) {
        axios.get(`/api/campus/${id}`)
            .then(res => {
                const action = getCampus(res.data);
                dispatch(action);
            })
            .catch(console.error);
    }
}

export function createNewCampus(campus) {
    return function thunk(dispatch) {
        axios.post('api/campus', campus)
            .then(res => dispatch(addCampus(res.data)))
            .catch(console.error);
    }
}

export function destroyCampus(id) {
    return function thunk(dispatch) {
        dispatch(removeCampus(id));
        axios.delete(`api/campus/${id}`)
            .catch(console.error)
    }
}
