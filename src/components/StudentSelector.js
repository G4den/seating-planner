import React from "react";

const StudentSelector = (props) => {
    return (
        <div className={"flex flex-col space-y-8"}>
            <div className={"flex flex-col space-y-2 max-h-96"}>
                <h1 className={"font-bold"}>Students</h1>
                <div className={"grid grid-cols-4 w-full h-full overflow-auto gap-x-2 gap-y-2"}>
                    {props.students.map(student => {

                        const selected = props.selectedStudents.includes(student);
                        return (
                            <div
                                key={student}
                                onClick={() => props.onStudentClick(student)}
                                className={`cursor-pointer rounded-xl border-2 border-black h-10 flex justify-between items-center p-2`}>
                                <div className={"w-28 flex justify-between"}>
                                    <h1 className={"flex font-bold"}>{student}</h1>
                                    <h1 className={"font-sans"}>{selected ? props.selectionCharacter : ""}</h1>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

StudentSelector.defaultProps = {
    selectedStudents: [],
    onStudentClick:()=>console.log("onStudentClick missing"),
    selectionCharacter:"",
}

export default StudentSelector;