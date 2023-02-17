import Navbar from "../addons/Navbar";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBRow,
    MDBCol,
}
    from 'mdb-react-ui-kit';

function HomeLogin() {
    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardImage className="p-3" src="/images/tracker.png" position="top" alt="Tracker Page" />
                            <MDBCardBody>
                                <MDBCardTitle>Tracker Page</MDBCardTitle>
                                <MDBCardText>
                                    Visualize and keep track of your food waste data.
                                </MDBCardText>
                                <MDBBtn href="/Tracker">Visit</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardImage className="p-3" src="/images/sharing.png" position="top" alt="Tracker Page" />
                            <MDBCardBody>
                                <MDBCardTitle>Sharing Page</MDBCardTitle>
                                <MDBCardText>
                                    View combined shared food waste data and discuss with others.
                                </MDBCardText>
                                <MDBBtn href="#">Visit</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default HomeLogin;