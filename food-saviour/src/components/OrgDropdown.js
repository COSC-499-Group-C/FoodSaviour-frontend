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
  const [name, setName] = useState("Join Organization");
  const [org_id, setOrg_id] = useState(1);
  const [orgList, setOrgList] = useState(["Org A", "Org B", "Org C", "Org D"]);

  const orgName = (e, org_id) => {
    setName(e.target.innerHTML);
    setOrg_id(org_id);
    e.preventDefault();
  }

  const addOrganization = (e) => {
    e.preventDefault();
    const orgNameInput = document.getElementById("org-name-input").value;
    if (orgNameInput) {
      setOrgList([...orgList, orgNameInput]);
      setName(orgNameInput);
      setActiveElementType("dropdown");
    }
  }

  function dropDown() {
    return (
      <MDBDropdown group className="mb-3">
        <MDBDropdownToggle onClick={(event) => event.preventDefault()}>
          {name}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {orgList.map((org, index) => (
            <MDBDropdownItem key={index} link onClick={(event)=> orgName(event, index + 1)}>
              {org}
            </MDBDropdownItem>
          ))}
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  function inputFieldComp() {
    return (
      <div className="mb-3">
        <MDBRow className="align-items-center mb-3">
          <MDBCol className="flex-grow-1">
            <MDBInput id="org-name-input" label="Organization Name" />
          </MDBCol>
          <MDBCol>
            <MDBBtn color="success" type="submit" className="float-end" onClick={addOrganization}>
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

          <MDBBtn onClick={() => setActiveElementType('input')} color="secondary" className="float-end">
            Add Organization
          </MDBBtn>
        </div>
      ) : null}
      {activeElementType === 'input' ? inputFieldComp() : null}
    </div>
  );
}

export default OrgDropdown;
