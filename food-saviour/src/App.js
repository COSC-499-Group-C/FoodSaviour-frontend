import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './css/App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeLogin from "./pages/HomeLogin";
import Tracker from "./pages/Tracker";
import SharingLoading from "./util/SharingLoading";
import Logout from './components/Logout';
import React from "react";
import AuthProtected from './util/authProtected'

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Login/>}/>

                <Route element={<AuthProtected/>}>
                    <Route path="/homelogin" element={<HomeLogin/>}/>
                    <Route path="/sharing" element={<SharingLoading/>}/>
                    <Route path="/tracker" element={<Tracker/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>
                </Route>

            </Routes>
        </Router>
    );

}

export default App;