import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Home from "./component/Home.js";
import Intro from "./component/Intro.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
