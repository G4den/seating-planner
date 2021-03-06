import axios from "axios";

const api = axios.create({
    baseURL: "https://seating-planner-api.herokuapp.com/", 
})

export const SignIn = (student) => {
    return {
        type:'SIGN_IN',
        payload: {
            student
        }
    }
}


export const SetLikedStudents = (students) => {
    return {
        type:'SET_LIKED_STUDENTS',
        payload: {
            students
        }
    }
}

export const SetDislikedStudents = (students) => {
    return {
        type:'SET_DISLIKED_STUDENTS',
        payload: {
            students
        }
    }
}

export const SetWhiteboardPriority = (priority) => {
    return {
        type: 'SET_WHITEBOARD_PRIORITY',
        payload: {
            priority
        }
    }
}

export const CreateClassRoom = (students, navigate) => async(dispatch, getState) => {
    const {classRoomPassword} = getState().Main

    const res = await api.post(`/classroom/${classRoomPassword}/students`, {
        students: students.map(student => {
            return {
                name: student, 
                likes:[], 
                dislikes: [],
                preferredDistanceToWhiteboard: 0,
            }
        })
    })  

    await dispatch({
        type:'SET_ALL_STUDENTS',
        payload: {
            students
        }
    })

    dispatch({
        type:"COMBINE",
        payload: {
            justCreated: true,
        }
    })

    navigate(`/generate/${classRoomPassword}`)
}

export const SetAllStudents = (students) => async(dispatch) => {
    await dispatch({
        type:'SET_ALL_STUDENTS',
        payload: {
            students
        }
    })
}

export const DeleteStudentForCreation = (student) => {
    return {
        type:'DELETE_STUDENT_FOR_CREATION',
        payload: {
            student
        }
    }
}

export const CreateRoom = (navigate) => async (dispatch) => {

    const res = await api.post("/classroom", {
        className: "bingbong"
    })
    const {classId, _id} = res.data.classroom;
    navigate("/create")

    dispatch({
        type:"COMBINE",
        payload: {
            classRoomId: _id,
            classRoomPassword: classId
        }
    })
}

export const SetPassword = (password) => {
    return {
        type:"COMBINE",
        payload: {
            classRoomPassword: password
        }
    }
}