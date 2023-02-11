import React, { useState } from "react";
import PieChart from "./PieChart.js";
import {
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBTabsLink,
    MDBTabsItem,
    MDBTabs,
    MDBTabsPane, 
    MDBTextArea
}
    from "mdb-react-ui-kit";

function Tracker() {
    const data = [{ label: "Apples", value: 10 }, { label: "Oranges", value: 20 }, { label: "Bananas", value: 30 }];

    const [justifyActive, setJustifyActive] = useState("step1");

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <div>
                <h2 className="mb-3">Tracker Page</h2>
            </div>
            <div className="p-4 mb-4 shadow-5-strong rounded">
                <MDBRow tag="form" className="g-3" between>
                    <MDBCol md="8">
                        <MDBRow className="g-3" between>
                            <MDBCol md="6">
                                <MDBDropdown>
                                    <MDBDropdownToggle>Waste Type</MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>Waste Type 1</MDBDropdownItem>
                                        <MDBDropdownItem link>Waste Type 2</MDBDropdownItem>
                                        <MDBDropdownItem link>Waste Type 3</MDBDropdownItem>
                                        <MDBDropdownItem link>Waste Type 4</MDBDropdownItem>
                                        <MDBDropdownItem link>Waste Type 5</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="input-group has-validation">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total Amount"
                                    required
                                    />
                                    <span className="input-group-text">
                                        kg
                                    </span>
                                    <div className="invalid-feedback">Please enter an amount.</div>
                                </div>
                            </MDBCol>
                            <MDBCol md="12">
                                <MDBTextArea
                                name="desc"
                                required
                                label="Description"
                                />
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBTabs pills>
                            <MDBTabsItem>
                                <MDBTabsLink className="py-4 m-0" onClick={() => handleJustifyClick("step2")} active={justifyActive === "step2"}>
                                    Next
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>
                    </MDBCol>
                </MDBRow>
                <MDBTabsPane show={justifyActive === "step2"}>
                    <MDBRow tag="form" className="g-3 mt-1" show={justifyActive === "step2"}>
                        <MDBCol md="3">
                            <MDBInput
                            name="compost"
                            required
                            label="Compost"
                            />
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBInput
                            name="compost"
                            required
                            label="Donations"
                            />
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBInput
                            name="compost"
                            required
                            label="Frozen"
                            />
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBInput
                            name="compost"
                            required
                            label="Landfill"
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBTabsPane>
            </div>

            <PieChart
                data = {data}
                width = {200}
                height = {200}
                innerRadius = {60}
                outerRadius = {100}
            />
        </MDBContainer>
        );
}

export default Tracker;