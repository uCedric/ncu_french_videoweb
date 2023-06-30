import { useState } from 'react';

import "./Home.css"

const Home = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const handleLogin = () => {
        if (username == 'admin' && password == 'password') {
        alert('登入成功');
        } else {
        alert('登入失敗');
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
