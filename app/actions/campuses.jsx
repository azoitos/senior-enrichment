import axios from 'axios';


export const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
export const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';
export const ADD_CAMPUS = 'ADD_CAMPUS'

export function getCampuses (campuses) {
    return {
        type: GOT_CAMPUSES_FROM_SERVER,
        campuses
    }
}

export function getCampus (campus) {
    return {
        type: GOT_CAMPUS_FROM_SERVER,
        campus
    }
}

export function createCampus(campus) {
    return {
        type: ADD_CAMPUS,
        campus
    }
}

export function fetchCampuses() {
    return function thunk(dispatch) {
        axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    }
}


export function fetchCampus(id) {
    return function thunk(dispatch) {
        axios.get(`/api/campus/${id}`)
            .then(res => {
                return res.data
            })
            .then(campus => {
                const action = getCampus(campus);
                dispatch(action);
            })
            .catch(console.error);
    }
}

export function createNewCampus(campus){
    return function thunk(dispatch){
        axios.post('api/campus', campus)
            .then(res => dispatch(createCampus(res.data)))
            .catch(console.error);
    }

}
