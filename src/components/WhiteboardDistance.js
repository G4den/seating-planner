import {connect} from "react-redux"
import {SetWhiteboardPriority} from "../actions";

const WhiteboardDistance = (props) => {
    return (
        <div className={"flex w-full font-bold gap-x-3"}>

            <input
                className={"grow slider"}
                type="range"
                min="0" max="5"
                value={props.state.whiteboardPriority}
                onChange={(e) => props.SetWhiteboardPriority(e.target.value)}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state.Main
    }
}


export default connect(mapStateToProps, {SetWhiteboardPriority})(WhiteboardDistance);