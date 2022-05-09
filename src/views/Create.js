import React from "react"
import CreateStudentCard from "../components/CreateStudentCard";
import useState from 'react-usestateref';
import { connect } from "react-redux";
import { CreateRoom, CreateClassRoom } from './../actions';
import { useNavigate } from "react-router-dom"

const Create = (props) => {
    const [students, setStudents, currentStudents] = useState([])
    const [currentName, setCurrentName] = useState("")
    const navigate = useNavigate();

    const addStudent = () => {
        if (currentName.length === 0)
            return

        setStudents([...students, currentName]);
        setCurrentName("");
    }

    const removeStudent = (studentToRemove) => {
        console.log(studentToRemove)
        setStudents(currentStudents.current.filter(student => studentToRemove !== student))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addStudent();
        }
    }

    return (
        <div className={"w-screen h-screen flex flex-col items-center justify-center"}>
            <div className={"flex flex-col space-y-8 items-center"}>
                <div className={"flex flex-col space-y-5 items-center"}>
                    <h1 className={"text-5xl font-bold"}>Add students</h1>
                    <div className={"flex  justify-between items-end space-x-2"}>
                        <input autoFocus={true} onKeyPress={handleKeyPress} spellCheck={false} type={"name"} value={currentName} onChange={e => setCurrentName(e.target.value)} className={"w-72 h-14 rounded-xl text-2xl outline-none border-2 border-black text-center  "} />
                        <button onClick={addStudent} className={"w-16 h-14 border-2 border-black rounded-xl text-xl"}>Add</button>
                    </div>
                </div>
                {
                    students.length > 0 &&
                    <React.Fragment>
                        <div className={"flex flex-col w-96 space-y-2 max-h-96"}>
                            <h1 className={"font-bold"}>Students</h1>
                            <div className={"grid grid-cols-3 w-full h-full overflow-auto gap-x-2 gap-y-2"}>
                                {students.map(student => <CreateStudentCard key={student} removeStudent={removeStudent} student={student} />)}
                            </div>
                        </div>
                        <div className={"flex w-full justify-end"}>
                            <button onClick={() => props.CreateClassRoom(students, navigate)}>Next</button>
                        </div>
                    </React.Fragment>

                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.Main
    }
}

export default connect(mapStateToProps, { CreateRoom, CreateClassRoom })(Create)