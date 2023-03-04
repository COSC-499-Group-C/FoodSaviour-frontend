import React, {Component, useEffect, useState} from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
})

api.get('/login/').then(res => {
    console.log(res.data);
})

class TestAPI extends Component {
    render() {
        return (
            <div className="testapi">
                <form>
                    <label>Username: </label>
                    <input type="text" name="username"/>
                    <label>Password: </label>
                    <input type="password" name="password"/>
                </form>
            </div>
        );
    }
}

export default TestAPI;

// !!!!Ignore this file for now!!!!