import React, {useEffect, useState} from 'react';
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
import axiosInstance from "../axios";

function OrgDropdown(props) {
    const [activeElementType, setActiveElementType] = useState('dropdown');
    const [name, setName] = useState("Join Organization");
    const [org_id, setOrg_id] = useState(1);
    const [orgList, setOrgList] = useState([]);
    const [showAddOrgButton, setShowAddOrgButton] = useState(true);

    const handleInputChange = (e) => {
        if (e.target.value) {
            setShowAddOrgButton(true);
        } else {
            setShowAddOrgButton(false);
        }
    }

    const orgName = (e, org_id) => {
        setName(e.target.innerHTML);
        setOrg_id(org_id);
        props.onOrgSelected(org_id);
        e.preventDefault();
    }

    const addOrganization = (e) => {
        e.preventDefault();
        const orgNameInput = document.getElementById("org-name-input").value;
        if (orgNameInput) {
            // Make a POST request with the orgNameInput value
            axiosInstance
                .post("orgName/", {name: orgNameInput})
                .then((response) => {
                    // Update the state with the new organization data returned from the server
                    const newOrg = response.data;
                    setOrgList([...orgList, newOrg]);
                    setName(newOrg.name);
                    setOrg_id(newOrg.id);
                    setActiveElementType("dropdown");
                    setShowAddOrgButton(false);
                })
                .catch((error) => console.error(`Error: ${error}`));
        }
    }

    function dropDown() {
        return (
            <MDBDropdown group className="mb-3">
                <MDBDropdownToggle onClick={(event) => event.preventDefault()}>
                    {name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    {orgList
                        .slice() // Create a shallow copy to avoid modifying the original orgList
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort organizations alphabetically
                        .map((org, index) => (
                            <MDBDropdownItem key={index} link onClick={(event) => orgName(event, org.id)}>
                                {org.name}
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
                        <MDBInput id="org-name-input" label="Organization Name" onChange={handleInputChange}/>
                    </MDBCol>
                    <MDBCol>
                        {showAddOrgButton && (
                            <MDBBtn color="success" type="submit" className="float-end" onClick={addOrganization}>
                                Add Organization
                            </MDBBtn>
                        )}
                    </MDBCol>
                </MDBRow>
                <div onClick={() => {
                    setActiveElementType('dropdown');
                    setShowAddOrgButton(true);
                }}>
                    <MDBBtn color="primary">Cancel</MDBBtn>
                </div>
            </div>
        );
    }


    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axiosInstance
            .get("orgName/")
            .then((response) => {
                setOrgList(response.data);
            })
            .catch(error => console.error(`Error: ${error}`));
    }


    return (
        <div>
            {activeElementType === 'dropdown' ? (
                <div className="mb-3">
                    {dropDown()}

                    {showAddOrgButton && (
                        <MDBBtn onClick={() => {
                            setActiveElementType('input');
                            setShowAddOrgButton(false);
                        }} color="secondary" className="float-end">
                            Add Organization
                        </MDBBtn>
                    )}
                </div>
            ) : null}
            {activeElementType === 'input' ? inputFieldComp() : null}
        </div>
    );
}

export default OrgDropdown;
