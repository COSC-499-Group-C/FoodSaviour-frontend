import '../css/App.css';
import React from "react";
import Documentation from "../components/Documentation.js";
import { Navigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTooltip
}
    from "mdb-react-ui-kit";

function Home() {
    if (localStorage.getItem('refresh_token')) {
        return <Navigate to="/homelogin"/>;
    } else {
        return (
            <div className="home">
            <MDBContainer className="App-header fadein">
                <MDBRow className="align-items-center">
                    <MDBCol md="12" className="text-center my-5">
                        <img src={"/images/foodsaviour_logo.svg"} className="d-inline" width="96px" alt="logo"/>
                        <h1 className="d-inline display-1 fw-bold align-middle mx-3">Food Saviour</h1>
                    </MDBCol>
                    <MDBCol md="12" className="text-center">
                        <p className="d-inline align-middle m-0">Dashboard for calculating and avoiding food waste in our food systems.</p>
                        <MDBTooltip tag="FaQuestionCircle" wrapperProps={{ className: "px-1 mx-2" }} placement="left" title=
                        "Many non-profits need to manage food waste more quickly, however, few community groups have resources to figure out the ways that food can be diverted from the garbage dump.
                        Food Saviour aims to remedy this by allowing metrics to be calculated and then graphically displayed to illustrate savings calculations."
                        >
                            <FaQuestionCircle/>
                        </MDBTooltip>
                    </MDBCol>
                    <MDBCol md="12" className="text-center my-5">
                        <a href="/login" className="btn btn-home btn-primary">Login or Register</a>
                    </MDBCol>
                </MDBRow>
                <Documentation className="text-decoration-none text-white fs-5"></Documentation>
            </MDBContainer>
            </div>
        );
    }
}

export default Home;
