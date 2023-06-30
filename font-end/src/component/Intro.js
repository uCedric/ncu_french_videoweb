import {Link} from "react-router-dom";

import "./Intro.css"
import ncu_pic from "../img/ncu_pic.jpg"
import ncu_bg from "../img/ncu_bg.jpg"
const Intro = ()=>{  
    
    return(
        <div className="welcome-container">
            <div className="container-card">
                <img src={ncu_pic} alt="ncu_pic"/>
                <h2>Welcome to NCU french video web</h2>
                <Link to="/home">
                    <button>Entry</button>
                </Link>
            </div>
        </div>
    );
};

export default Intro;