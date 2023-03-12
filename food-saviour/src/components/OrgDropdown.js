import React, { useState } from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBDropdownToggle,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';

function OrgDropdown() {
  const [activeElementType, setActiveElementType] = useState('dropdown');
  const [name, setName] = useState("");

  const orgChanged = (e) => {
    setName(e.target.value);
  }

  function dropDown() {
    return (
      <MDBDropdown group className="mb-3">
        <MDBDropdownToggle onClick={(event) => event.preventDefault()}>
          Join Organization
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link onClick={orgChanged}>Org A</MDBDropdownItem>
          <MDBDropdownItem link onClick={orgChanged}>Org B</MDBDropdownItem>
          <MDBDropdownItem link onClick={orgChanged}>Org C</MDBDropdownItem>
          <MDBDropdownItem link onClick={orgChanged}>Org D</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  function inputFieldComp() {
  return (
    <div className="mb-3">
      <MDBRow className="align-items-center mb-3">
        <MDBCol className="flex-grow-1">
          <MDBInput label="Organization Name" />
        </MDBCol>
        <MDBCol>
          <MDBBtn color="success" type="submit" className="float-end">
            Add Organization
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <div onClick={() => setActiveElementType('dropdown')}>
        <MDBBtn color="primary">Cancel</MDBBtn>
      </div>
    </div>
  );
}

  return (
    <div>
      {activeElementType === 'dropdown' ? (
        <div className="mb-3">
          {dropDown()}

            <MDBBtn onClick={() => setActiveElementType('input')} color="secondary" className="float-end">Add Organization</MDBBtn>

        </div>
      ) : null}
      {activeElementType === 'input' ? inputFieldComp() : null}
    </div>
  );
}

export default OrgDropdown;
