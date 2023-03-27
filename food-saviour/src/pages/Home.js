import '../css/App.css';
import React from "react";
import Documentation from "../components/Documentation.js";
import { Navigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";

function Home() {
    if (localStorage.getItem('refresh_token')) {
        return <Navigate to="/homelogin"/>;
    } else {
        const moreInfo = (e, state) => {

            let left  = e.clientX  + "px";
            let top  = e.clientY  + "px";

            let info = document.getElementById("info");

            info.style.left = left;
            info.style.top = top;

            if (state === "on") {
                info.className = "bg-light position-fixed rounded text-black p-2 m-3 fs-6";
            } else if (state === "off") {
                info.className = "d-none position-fixed";
            }
        }
        return (
            <div className="home">
            <MDBContainer className="App-header fadein">
                <MDBRow className="align-items-center">
                    <MDBCol md="12" className="text-center my-5">
                        <img src={"/images/foodsaviour_logo.svg"} className="d-inline img-md" alt="logo"/>
                        <h1 className="d-inline display-1 fw-bold align-middle mx-3">Food Saviour</h1>
                    </MDBCol>
                    <MDBCol md="12" className="text-center">
                        <p className="d-inline align-middle m-0">Dashboard for calculating and avoiding food waste in our food systems.</p>
                        <span className="align-top px-1 mx-2" onMouseEnter={(event) => moreInfo(event, "on")} onMouseLeave={(event) => moreInfo(event, "off")}>
                            <FaQuestionCircle/>
                        </span>
                        <span className="d-none position-fixed" id="info">
                            Many non-profits need to manage food waste more quickly, however, few community groups have resources to figure out the ways that food can be diverted from the garbage dump.
                            <br/>
                            <b>Food Saviour</b> aims to remedy this by allowing metrics to be calculated and then graphically displayed to illustrate savings calculations.
                        </span>
                    </MDBCol>
                    <MDBCol md="12" className="text-center my-5">
                        <a href="/login" className="btn btn-home btn-primary">Login or Register</a>
                    </MDBCol>
                </MDBRow>
                <Documentation></Documentation>
            </MDBContainer>
            </div>
        );
    }
}

export default Home;
