import React, { useEffect,useState } from 'react';
import { useLocation,} from 'react-router-dom';//useLocation可以取得上一頁傳過來的state
import axios from 'axios';

import Videocard from '../component/Videocard';
import Playing from '../component/Playing';
import Navbar from '../component/Navbar';
import "./Video.css";


function Video() {
  const {state} = useLocation();
  const [videolist,setVideolist] = useState([]);
  const [playing,setPlaying] = useState(false);
  const [videoInfo, setVideoURL] = useState([]);

  const handlePlaying = (data,state) =>{
    setVideoURL(data);
    console.log(state);
    setPlaying(state);
  }

  const showingToken=()=>{
    alert(email);
  }

  useEffect(()=>{
      axios.get("http://localhost:8081/video/all")
        .then((data)=>{
          setVideolist(data.data);
        });
  },[]);

  return (
    <div>
      <div className='nav-area'>
        <Navbar func={handlePlaying}/>
      </div>
      <div className='vcard-area'>
        {playing ?(<Playing info={videoInfo} playing={handlePlaying} videolist={videolist}/>)
                  :
                  (videolist.map((data)=>{
                    return(
                      <Videocard id={data._id} title={data.title} description={data.description} views={data.views} playing={handlePlaying}/>
                    );
                  }))
        } {/*根據playing state決定當前畫面的是否要呈現播放器*/}
      </div>
      <button onClick={showingToken}>2222</button>
    </div>
  );
}

export default Video;