import { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

import "./Home.css"

const Home = ()=>{
    const navigate = useNavigate();
    const [email, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    
    const handleLogin =async () => {
        const result = await axios.post('http://localhost:8081/auth/login',{email:email,password:password});
        console.log(result.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;
        if(result.status == "200"){
            navigate('/video',{state:{email:email}});
        }
    };

    const stateChange=()=>{
        setIsRegister(!isRegister);
    };
    return(
        <div className='login-bg'>
            <div className='login-card'>
                <h2>Login</h2>
                <form>
                    <div className='p1'>
                        <label>Email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setUseremail(e.target.value)}
                        />
                    </div>
                    <div className='p1'>
                        <label>Password:</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                </form>
                <div className='p2'>
                    <button type="button" onClick={handleLogin}>
                            Login
                    </button>
                    <div className='register' onClick={stateChange}>
                        Register
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
