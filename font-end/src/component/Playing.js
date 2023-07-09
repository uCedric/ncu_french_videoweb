import { useEffect, useState } from "react";

import "./Playing.css";
import Videocard from './Videocard';

const Playing = (props) => {
    const [video_watching,setWatching] = useState([props.info[0],props.info[1],props.info[2],props.info[3]]);
    const handlePlaying = () =>{
        props.playing([],false);
    };

    const selectVideo =(data)=>{
        setWatching(data);
    };

    return(
        <div className="Playing-main">
            <div className="part1">
                <div onClick={handlePlaying} className="previous-page">
                    <img  src="../img/arrow-left.png"/>
                    <h4>上一頁</h4>
                </div>
                <div className="playing-area">
                    <video key={video_watching} controls autoPlay loop>
                        <source src={`http://localhost:8082/videostream/${video_watching[0]}`} type="video/mp4"/>
                    </video>
                </div>
                <h3 className="title">{video_watching[1]}</h3>
                <p className="description">{video_watching[2]}</p>
            </div>
            <div className="part2">
                {
                    props.videolist.map((data)=>{
                        return(
                          <Videocard id={data._id} title={data.title} description={data.description} views={data.views} playing={selectVideo}/>
                        );
                    })
                }
            </div>
        </div>
    );
};
export default Playing;