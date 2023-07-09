

import "./Navbar.css";

const Navbar = (props) => {

    const toggle =()=>{
        alert("toggle: 1.my video 2.favorite list 3.add video 4.point");
    }
    const search =()=>{
        
    }
    return(
        <div className="nav">
            <div onClick={props.playing} className="logo-area">
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
            <div  onClick={toggle} className="account-area">
                <p>account</p>
                <img src="../img/user.png"/>
            </div>
        </div>
    );
};
export default Navbar;