import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { useParams } from "react-router-dom";
import LayoutMaker from "../components/LayoutMaker";


import axios from "axios";
const api = axios.create({
    baseURL: "https://seating-planner-api.herokuapp.com/", 
})


const Generate = (props) => {
    let { id } = useParams();
    const [students, setStudents] = useState();

    useEffect(() => {
        
        (async () => {
            if(props.main.justCreated)
                return;

        const res = await api.get(`/classroom/${id}`)
        setStudents(res.data.classroom.students);
        })();

    }, [])

    return (
        <div className={"flex w-screen h-screen items-center justify-center flex-col gap-y-4"}>
            {
                props.main.justCreated ? 
                <React.Fragment>
                    <h1 className={"text-3xl font-bold"}>
                        Share this code with your students: <span className="underline">{id}</span>
                    </h1>
                    <h1 className={"text-xl font-bold"}>
                        Refresh this page once your students have updated their preferences
                    </h1>
                    <div className="flex flex-col text-center border-2 rounded-xl p-4 border-black">
                        <h1 className={"text-xl font-bold"}>
                            Drag this link to you bookmarks to save for later
                        </h1>
                        <a href={`https://seatingplanner.com/generate/${id}`} className="font-bold text-blue-400 text-2xl">
                            https://seatingplanner.com/generate/{id}
                        </a>
                    </div>
                </React.Fragment>
                :
                <div>
                
                    <LayoutMaker students={students}/>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        main: state.Main
    }
}

export default connect(mapStateToProps)(Generate)