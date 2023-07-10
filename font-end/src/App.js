import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Home from "./page/Home.js";
import Intro from "./page/Intro.js";
import Video from "./page/Video.js";
import Myinfo from "./page/Myinfo.js";
import Addvideo from "./page/Addvideo.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/video" element={<Video/>}/>
          <Route path="/Myinfo" element={<Myinfo/>}/>
          <Route path="/addvideo" element={<Addvideo/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
