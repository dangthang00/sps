import {BrowserRouter as Router, Routes ,Route, Link} from "react-router-dom";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import './App.css';

function App() {
  return (
   
    <div className="App">
        <nav>
              <h1></h1>
            
        </nav>

        <Routes>

          <Route path="/" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Home" element={<Home/>} />
        </Routes>
        
    </div>
  );
}

export default App;
