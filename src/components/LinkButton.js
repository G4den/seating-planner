import {Link} from "react-router-dom";
import React from "react";

const LinkButton = (props) => {
    return (
        <Link to={props.to} className={"p-1 px-3 rounded-xl border-2 border-black w-min font-bold"}>{props.name}</Link>
    )
}

LinkButton.defaultProps = {
    to: "/",
    name:"Next"
}

export default LinkButton;