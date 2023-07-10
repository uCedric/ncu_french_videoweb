import { useState } from "react";
import {  useNavigate } from 'react-router-dom';

import "./Navbar.css";

const Navbar = (props) => {
    const navigate = useNavigate();
    const [toggleState,setToggleState] = useState(false);

    const handleNavigate = (path) =>{
        navigate("/"+path);
    };

    const toggle =()=>{
        setToggleState(!toggleState);
    }
    const search =()=>{
        
    }
    return(
        <div className="nav">
            <div onClick={props.func} className="logo-area">
                <img src="../img/ncu_full_logo.png"/>
            </div>
            <div className="search-area">
                <input onChange={search} type="text" placeholder="Search video name"/>
                <button onClick={search}>
                    <img src="../img/search.png"/>
                </button>
            </div>
            <div>
                
            </div>
            <div>
                <div onClick={toggle} className="account-area">
                    <p>account</p>
                    <img src="../img/user.png"/>
                </div>
                <div className={toggleState?("toggle-menu-visible"):("toggle-menu-unvisible")}>
                    <div className="container">
                        <img src="../img/info.png"/>
                        <h3 onClick={()=>{handleNavigate("Myinfo")}}>my info</h3>
                    </div>
                    <div className="container">
                        <img src="../img/add.png"/>
                        <h3 onClick={()=>{handleNavigate("Addvideo")}}>add video</h3>
                    </div>
                    <div className="container">
                        <img src="../img/list.png"/>
                        <h3 onClick={()=>{handleNavigate("Favoritelist")}}>favorite list</h3>
                    </div>
                    <div className="container">
                        <img src="../img/score.png"/>
                        <h3 onClick={()=>{handleNavigate("Myscore")}}>my score</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default Navbar;
/*
<div className={toggleState?("toggle-menu-visible"):("toggle-menu-unvisible")}>
                    <div onClick={handleNavigate("info")}>info</div>
                    <div onClick={handleNavigate("add video")}>add video</div>
                    <div onClick={handleNavigate("favorite list")}>favorite list</div>
                    <div onClick={handleNavigate("score")}>score</div>
                </div>
*/ 