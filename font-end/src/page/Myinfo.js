import { useState } from "react";
import {  useNavigate } from 'react-router-dom';

import Navbar from "../component/Navbar";
import "./Myinfo.css";

const Myinfo = () => {
    const navigate = useNavigate();

    const handleNavigate = () =>{
        navigate("/video");
    };
    return(
        <div className="myinfo-main">
            <div className="myinfo-nav">
                <Navbar func={handleNavigate}/>
            </div>
            <div className="myinfo-area">
                <form>
                    <div className='p1'>
                        <label>Email:</label>
                        <input
                            type="text"
                            value="email"
                            /*onChange={(e) => setUseremail(e.target.value)}*/
                        />
                    </div>
                    <div className='p1'>
                        <label>Password:</label>
                        <input
                        type="password"
                        value="password"
                        /*onChange={(e) => setPassword(e.target.value)}*/
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Myinfo;