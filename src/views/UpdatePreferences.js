import React, {useEffect} from "react";
import StudentSelector from "../components/StudentSelector";
import MultipleStudentSelector from "../components/MultipleStudentSelector";
import {connect} from "react-redux";
import {SetDislikedStudents, SetLikedStudents, SignIn} from "../actions";
import {Route, Routes, useMatch, useNavigate} from "react-router-dom";
import LinkButton from "../components/LinkButton";
import WhiteboardDistance from "../components/WhiteboardDistance"

import axios from "axios";
const api = axios.create({
    baseURL: "https://seating-planner-api.herokuapp.com/", 
})


const UpdatePreferences = (props) => {
    const {allStudents, classRoomPassword, signedInStudent, likedStudents, dislikedStudents, whiteboardPriority} = props.state;
    const navigate = useNavigate();
    const onStudentSignIn = (student) => {
        props.SignIn(student)
        navigate("/updateStudent/like")
    }

    const updateStudent = async () => {
        await api.put(`/classroom/${classRoomPassword}/students`, {
            studentName: signedInStudent,
            newLikes: likedStudents,
            newDislikes: dislikedStudents,
            newDistance: whiteboardPriority,
        })

        navigate("/success")
    }

    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
            <Routes>
                <Route path={'/signIn'} element={
                    <div className={"flex flex-col space-y-4"}>
                        <h1 className={"text-4xl font-bold"}>What is your name?</h1>
                        <StudentSelector students={allStudents} onStudentClick={onStudentSignIn}/>
                        <div className={"flex justify-end space-x-3"}>
                            <LinkButton to={'/'} name={"Back"}/>
                            <LinkButton to={'/updateStudent/like'}/>
                        </div>
                    </div>
                }/>

                <Route path={'/like'} element={
                    <div className={"flex flex-col space-y-4"}>
                        <h1 className={"text-4xl font-bold"}>Who do you want<br/> to sit next to? 😍</h1>
                        <MultipleStudentSelector
                            onSelectedStudentsChange={props.SetLikedStudents}
                            exclude={[props?.state?.signedInStudent || ""]}
                            students={allStudents}
                            selectionCharacter={"❤"}
                            selectedStudents={props.state.likedStudents}
                        />
                        <div className={"flex justify-end space-x-3"}>
                            <LinkButton to={'/updateStudent/signIn'} name={"Back"}/>
                            <LinkButton to={'/updateStudent/dislike'}/>
                        </div>
                    </div>
                }/>

                <Route path={'/dislike'} element={
                    <div className={"flex flex-col space-y-4"}>
                        <h1 className={"text-4xl font-bold"}>Who do you not want<br/> to sit next to? 😫</h1>
                        <MultipleStudentSelector
                            onSelectedStudentsChange={props.SetDislikedStudents}
                            exclude={[...props.state.likedStudents, props?.state?.signedInStudent || ""]}
                            students={allStudents}
                            selectionCharacter={"🤮"}
                            selectedStudents={props.state.dislikedStudents}
                        />
                        <div className={"flex justify-end space-x-3"}>
                            <LinkButton to={'/updateStudent/like'} name={"Back"}/>
                            <LinkButton to={'/updateStudent/whiteboard'}/>
                        </div>
                    </div>
                }/>

                <Route path={'/whiteboard'} element={
                    <div className={"flex flex-col space-y-8"}>
                        <div className={"relative w-full h-12 flex text-4xl justify-between"}>
                            <div className={`absolute relative w-80`}>
                                <h1 className={`absolute transition-all left-[${Math.round(props.state.whiteboardPriority * 20)}%]`}>🤓</h1>
                                <h1 className={"left-[10%] left-[20%] left-[30%] left-[40%] left-[50%] left-[60%] left-[70%] left-[80%] left-[90%] left-[100%]"}/>
                            </div>

                            <h1>👨‍🏫</h1>
                        </div>
                        <h1 className={"text-4xl font-bold"}>How close do you want<br/>to sit to the whiteboard?</h1>
                        <WhiteboardDistance/>
                        <div className={"flex justify-end space-x-3"}>
                            <LinkButton to={'/updateStudent/dislike'} name={"Back"}/>
                            <button 
                                className={"p-1 px-3 rounded-xl border-2 border-black w-min font-bold"}
                                onClick={updateStudent}>Done</button>
                        </div>
                    </div>
                }/>
            </Routes>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.Main
    }
}

export default connect(mapStateToProps, {SignIn, SetLikedStudents, SetDislikedStudents})(UpdatePreferences)