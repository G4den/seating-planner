const DEFAULT_STATE = {
    signedInStudent:"",

    classRoomId:"",
    classRoomPassword:"",
    allStudents: [""],

    whiteboardPriority:3,
    likedStudents: [],
    dislikedStudents: [],
}

const MainReducer = (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case "SIGN_IN":
            return {...state, signedInStudent: action.payload.student}
        case "COMBINE":
            return {...state, ...action.payload}
        case "SET_CLASSROOM_ID":
            return {...state, classRoomId: action.payload.id}
        case "SET_CLASSROOM_PASSWORD":
            return {...state, classRoomPassword: action.payload.password}
        case 'SET_ALL_STUDENTS':
            return {...state, allStudents: action.payload.students};
        case 'DELETE_STUDENT_FOR_CREATION':
            return {...state, creationStudents: state.creationStudents.filter(student => student !== action.payload.student)};
        case 'SET_LIKED_STUDENTS':
            return {...state, likedStudents:action.payload.students};
        case 'SET_DISLIKED_STUDENTS':
            return {...state, dislikedStudents:action.payload.students};
        case 'SET_WHITEBOARD_PRIORITY':
            return {...state, whiteboardPriority: action.payload.priority}
        default:
            return state;
    }
}

export default MainReducer;