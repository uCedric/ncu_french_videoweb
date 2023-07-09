import react from "react";
import "./Videocard.css";
const Videocard = (props)=>{
    const handlePlaying = () =>{
        const videoInfo = [props.id,props.title,props.description,props.views];
        props.playing(videoInfo,true);
    }

    return(
        <div onClick={handlePlaying} className="card">
            <img src="../img/ncu_bg.jpg"></img>
            <div className="info">
                <h4>{props.title}</h4>
                <div>{props.description}</div>
            </div>
        </div>
    );
};
export default Videocard;