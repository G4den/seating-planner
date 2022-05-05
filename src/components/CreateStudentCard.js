import {MdDelete} from "react-icons/md"

const CreateStudentCard = (props) => {
    return (
        <div className={"rounded-xl border-2 border-black h-10 flex justify-between items-center p-2"}>
            <h1 className={"flex font-bold truncate"}>{props.student}</h1>
            <MdDelete className={"cursor-pointer w-4 h-4 shrink-0"} onClick={() => props.removeStudent(props.student)}/>
        </div>
    )
}

export default CreateStudentCard