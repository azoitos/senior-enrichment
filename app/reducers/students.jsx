import axios from 'axios';

const initialState = {
    students: [],
    student: ''
}

//---------------ACTION TYPES---------------------//
export const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
export const GOT_SINGLE_STUDENT_FROM_SERVER = 'GOT_SINGLE_STUDENT_FROM_SERVER';
export const ADD_STUDENT = 'ADD_STUDENT';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';


//----------------ACTION CREATORS---------------//
export function getStudents(students) {
    return {
        type: GOT_STUDENTS_FROM_SERVER,
        students
    }
}

export function getStudent(student) {
    return {
        type: GOT_SINGLE_STUDENT_FROM_SERVER,
        student
    }
}

export function addStudent(student) {
    return {
        type: ADD_STUDENT,
        student
    }
}

export function removeStudent(id) {
    return {
        type: REMOVE_STUDENT,
        id
    }
}

//--------------REDUCER---------------------//
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GOT_STUDENTS_FROM_SERVER:
            newState.students = action.students;
            break;

        case GOT_SINGLE_STUDENT_FROM_SERVER:
            newState.student = action.student;
            break;

        case REMOVE_STUDENT:
            newState.students = newState.students.filter(student => student.id !== action.id);
            break;

        default: return state
    }
    return newState;
}


//-------------THUNK CREATORS--------------------//
export function fetchStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(student => {
                const action = getStudents(student);
                dispatch(action);
            });
    }
}

export function fetchStudent(id) {
    return function thunk(dispatch) {
        axios.get(`/api/students/${id}`)
            .then(res => {
                return res.data
            })
            .then(student => {
                const action = getStudent(student);
                dispatch(action);
            })
            .catch(console.error);
    }
}

export function createStudent(student) {
    return function thunk(dispatch) {
        axios.post(`api/students`, student)
            .then(res => dispatch(addStudent(res.data)))
            .catch(console.error)
    }
}

export function destroyStudent(id) {
    return function thunk(dispatch) {
        dispatch(removeStudent(id));
        axios.delete(`api/students/${id}`)
            .catch(console.error)
    }
}
