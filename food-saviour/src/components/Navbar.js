import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" fixed="top" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={"/images/foodsaviour_logo_bg.svg"} className="mx-2" height="48px" alt="logo"/>
          <p className="my-0 mx-2 fw-bold">Food Saviour</p>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/HomeLogin">Home</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Tracker">Tracker</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/Sharing">Sharing</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBBtn href="/logout">Logout</MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Navbar;