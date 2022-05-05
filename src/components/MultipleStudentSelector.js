import React, {useEffect, useState} from "react";
import StudentSelector from "./StudentSelector";

const MultipleStudentSelector = (props) => {
    const [selectedStudents, setSelectedStudents] = useState([])

    useEffect(() => {
        setSelectedStudents(props.selectedStudents)
    }, [])

    useEffect(() => {
        props.onSelectedStudentsChange(selectedStudents);
    }, [selectedStudents])

    const onClickedStudent = (student) => {
        if(selectedStudents.includes(student)){
            setSelectedStudents(selectedStudents.filter(s => s !== student))
        } else{
            setSelectedStudents([...selectedStudents, student])
        }
    }

    return (
        <div className={"flex flex-col space-y-4"}>
            <h1 className={"text-4xl"}>{props.question}</h1>
            <StudentSelector
                students={props.students.filter(student => !(props.exclude.includes(student)))}
                onStudentClick={onClickedStudent}
                selectedStudents={selectedStudents}
                selectionCharacter={props.selectionCharacter}
            />
        </div>
    )
}

MultipleStudentSelector.defaultProps = {
    exclude:[],
    students:[],
    onSelectedStudentsChange:() => {},
    selectionCharacter: "",
    selectedStudents:[],
}

export default MultipleStudentSelector;