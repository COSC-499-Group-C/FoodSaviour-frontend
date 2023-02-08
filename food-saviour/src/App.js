import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './css/App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import TestAPI from "./pages/TestAPI"
import axios from 'axios';
import React, {Component} from "react";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization': 'Token 2d5c9e287f6af7382d87f980a57d5f2e6ae17f21'
    }
})

class App extends Component {

    constructor() {
        super();
        api.get('/').then(res => {
            console.log(res.data);
        })
    }

    render() {
        return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Login/>}/>
                <Route path="/testapi" element={<TestAPI/>}/>
            </Routes>
        </Router>
    );
    }

}

export default App;