import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Home from "./component/Home.js";
import Intro from "./component/Intro.js";
import Video from "./component/Video.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/video" element={<Video/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
