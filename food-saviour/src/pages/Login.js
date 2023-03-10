import React, {useState} from 'react';
import {useNavigate, Navigate} from "react-router-dom";
import axiosInstance from '../axios';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

// const Login = () => {
//
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//
//   const { username, password } = formData;

export default function Login() {

    const [justifyActive, setJustifyActive] = useState("tab1");

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const navigate = useNavigate();

    const initialLoginFormData = Object.freeze({
        email: "",
        password: "",
    });

    // Handling Login form data and request

    const [loginFormData, loginUpdateFormData] = useState(initialLoginFormData);

    const handleLoginChange = (e) => {
        loginUpdateFormData({
            ...loginFormData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(loginFormData);

        axiosInstance
            .post("api/token/", {
                email: loginFormData.email,
                password: loginFormData.password,
            })
            .then((res) => {
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                axiosInstance.defaults.headers["Authorization"] =
                    "JWT " + localStorage.getItem("access_token");
                //console.log(res);
                //console.log(res.data);
            })
            .then(() => {
                axiosInstance
                    .get('users/')
                    .then((res) => {
                        localStorage.setItem('currUserId', res.data[0].id);
                        navigate("/homelogin");


                    });
            });
    };

    // Handling register form data and request

    const initialRegisterFormData = Object.freeze({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const [registerFormData, registerUpdateFormData] = useState(initialRegisterFormData);

    const handleRegisterChange = (e) => {
        registerUpdateFormData({
            ...registerFormData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(registerFormData);

        axiosInstance
            .post("register/", {
                first_name: registerFormData.name,
                email: registerFormData.email,
                user_name: registerFormData.username,
                password: registerFormData.password,
            })
            .then((res) => {
                navigate(0);
            });
    };

    if (localStorage.getItem('refresh_token')) {
        return <Navigate to="/homelogin"/>;
    } else {
        return (
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <div className="text-center text-black">
                    <img src={"/images/logo.png"} height={"100px"} alt="Food Saviour"/>
                    <h1>Food Saviour</h1>
                </div>
                <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick("tab1")} active={justifyActive === "tab1"}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick("tab2")} active={justifyActive === "tab2"}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === "tab1"}>

                        <MDBInput wrapperClass="mb-4" label="Email Address" id="email" name="email" type="text"
                                  autoComplete="email" onChange={handleLoginChange} required/>
                        <MDBInput wrapperClass="mb-4" label="Password" id="password" name="password"
                                  autoComplete="current-password" type="password" onChange={handleLoginChange}
                                  required/>

                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me"/>
                            <a href="!#">Forgot password?</a>
                        </div>

                        <MDBBtn className="mb-4 w-100" onClick={handleLoginSubmit}>Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="food-saviour/src/pages/Login#!">Register</a>
                        </p>

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === "tab2"}>

                        <MDBInput wrapperClass="mb-4" label="Name" id="name" name="name" type="text"
                                  autoComplete="name" onChange={handleRegisterChange} required/>
                        <MDBInput wrapperClass="mb-4" label="Username" id="username" name="username" type="text"
                                  autoComplete="username" onChange={handleRegisterChange} required/>
                        <MDBInput wrapperClass="mb-4" label="Email Address" id="email" name="email" type="text"
                                  autoComplete="email" onChange={handleRegisterChange} required/>
                        <MDBInput wrapperClass="mb-4" label="password" id="password" name="password" type="password"
                                  autoComplete="current-password" onChange={handleRegisterChange} required/>

                        <div className="d-flex justify-content-center mb-4">
                            <MDBCheckbox name="flexCheck" id="flexCheckDefault"
                                         label="I have read and agree to the terms"/>
                        </div>


                        <MDBBtn className="mb-4 w-100" onClick={handleRegisterSubmit}>Sign up</MDBBtn>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
        );
    }
}
