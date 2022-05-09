import useState from "react-usestateref";
import {Link, useNavigate} from "react-router-dom";
import { connect } from 'react-redux';
import { CreateRoom, SetAllStudents, SetPassword } from './../actions';  

import axios from "axios";

const api = axios.create({
    baseURL: "https://seating-planner-api.herokuapp.com/", 
})


const {MdRefresh} = require("react-icons/md")

const Landing = (props) => {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(false)
    const [checkTimeout, setCheckTimeout] = useState()

    const onInputChange = (e) => {
        if(checkTimeout){
            clearTimeout(checkTimeout);
        }

        const timeout = setTimeout(() => {
            checkCode(e.target.value);
        }, 300)

        setCheckTimeout(timeout);
    }

    const checkCode = async (code) => {
        setChecking(true);

        try{
            const res = await api.get(`/classroom/${code}`)
            await props.SetPassword(code);
            props.SetAllStudents(res.data.classroom.students.map(student => student.name))
            navigate("/updateStudent/signIn")
        }
        catch{
            setChecking(false)
        }
    }

    const onCreateRoom = () => {
        props.CreateRoom(navigate);
    }

    return (
        <div className={"w-screen h-screen flex items-center justify-center"}>
                <div className={"flex flex-col space-y-8"}>
                    <h1 className={"text-7xl font-bold"}>Seat planning <br/>made easy</h1>
                    <div className={"flex w-full justify-between items-end"}>
                        <h1 className={"font-bold text-3xl"}>Enter the <br/>room code </h1>
                        <div className={"flex items-center relative"}>
                            <input
                                spellCheck={false}
                                onChange={onInputChange}
                                className={"w-72 rounded-xl text-4xl outline-none border-2 border-black text-center p-4"}
                            />
                            {
                                checking ? <MdRefresh className={"absolute right-4 text-3xl animate-spin"}/> : ""
                            }
                        </div>
                    </div>
                </div>
            <h1 
            onClick={onCreateRoom}
            className={"hover:cursor-pointer fixed bottom-4 text-black "} >
                Create room instead
            </h1>
        </div>
    )
}

export default connect(undefined, {CreateRoom, SetAllStudents, SetPassword})(Landing)