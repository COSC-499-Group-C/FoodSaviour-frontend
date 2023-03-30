import '../css/home.css';
import Navbar from "../components/Navbar";
import Documentation from "../components/Documentation.js";
import {
    MDBContainer,
    MDBBtn,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';

function HomeLogin() {
    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="vh-100 home-bg text-white" fluid>
                <MDBRow className="h-100 align-items-center">
                    <MDBCol md="6" className="text-center tracker-card">
                        <div>
                            <img src="/images/tracker.png" className="mb-5" width="50%" alt="Tracker Page"/>
                                <h2>Tracker Page</h2>
                                <p className="fs-5">
                                    Visualize and keep track of your food waste data.
                                </p>
                                <MDBBtn href="/Tracker">Visit</MDBBtn>
                        </div>
                    </MDBCol>
                    <MDBCol md="6" className="text-center sharing-card">
                        <div>
                            <img src="/images/sharing.png" className="mb-5" width="50%" alt="Sharing Page"/>
                                <h2>Sharing Page</h2>
                                <p className="fs-5">
                                    View combined food waste data shared by others.
                                </p>
                                <MDBBtn href="/Sharing">Visit</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
                <Documentation className="text-decoration-none text-white fs-5"></Documentation>
            </MDBContainer>
        </div>
    );
}

export default HomeLogin;