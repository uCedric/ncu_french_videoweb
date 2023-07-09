import React, { useEffect,useState } from 'react';
import axios from 'axios';

import Videocard from './Videocard';
import Playing from './Playing';
import Navbar from './Navbar';
import "./Video.css";

function Video() {
  const [videolist,setVideolist] = useState([]);
  const [playing,setPlaying] = useState(false);
  const [videoInfo, setVideoURL] = useState([]);

  const handlePlaying = (data,state) =>{
    setVideoURL(data);
    console.log(state);
    setPlaying(state);
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
        <Navbar playing={handlePlaying}/>
      </div>
      <div className='vcard-area'>
        {playing ?(<Playing info={videoInfo} playing={handlePlaying} videolist={videolist}/>)
                  :
                  (videolist.map((data)=>{
                    return(
                      <Videocard id={data._id} title={data.title} description={data.description} views={data.views} playing={handlePlaying}/>
                    );
                  }))
        }
      </div>

    </div>
  );
}

export default Video;
/*{playing==false && (videolist.map((data)=>{
          console.log(data._id);
          return(
              <Videocard id={data._id} title={data.title} description={data.description} views={data.views} playing={handlePlaying}/>
          );
        }))}*/ 