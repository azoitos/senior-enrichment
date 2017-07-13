import axios from 'axios';

export const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
export const GOT_SINGLE_STUDENT_FROM_SERVER = 'GOT_SINGLE_STUDENT_FROM_SERVER';
export const REMOVE_STUDENT = "REMOVE_STUDENT";

export function getStudents (students) {
    return {
        type: GOT_STUDENTS_FROM_SERVER,
        students
    }
}

export function getStudent(student){
    return {
        type: GOT_SINGLE_STUDENT_FROM_SERVER,
        student
    }
}

export function removeStudent(){
    return {
        type: REMOVE_STUDENT,
    }
}

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
                console.log(res.data);
                return res.data
            })
            .then(student => {
                const action = getStudent(student);
                dispatch(action);
            })
            .catch(console.error);
    }
}

export function deleteStudent(id){
    return function thunk(dispatch){
        dispatch(removeStudent());
        axios.delete(`/api/students/${id}`)
        .error(console.err);
    }
}