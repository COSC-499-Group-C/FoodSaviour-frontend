import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './css/App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;