import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './css/App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Tracker from "./pages/Tracker";
import TestAPI from "./pages/TestAPI"
import React from "react";

function App() {

        return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Login/>}/>
                <Route path="/tracker" element={<Tracker/>}/>
                <Route path="/testapi" element={<TestAPI/>}/>
            </Routes>
        </Router>
    );

}

export default App;