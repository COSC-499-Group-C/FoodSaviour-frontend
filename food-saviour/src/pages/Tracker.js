import React, { useState } from "react";
import PieChart from "./PieChart.js";
import "../css/tracker.css";
import {
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBTextArea,
    MDBBtn,
    MDBCard,
    MDBCardBody
}
    from "mdb-react-ui-kit";

function Tracker() {
    const [total, setTotal] = useState(0);
    const [desc, setDesc] = useState("");
    const [charts, setCharts] = useState([]);

    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(0);
    const [percent3, setPercent3] = useState(0);
    const [percent4, setPercent4] = useState(0);
    const [percent5, setPercent5] = useState(0);
    const [percent6, setPercent6] = useState(0);
    const [percent7, setPercent7] = useState(0);

    const totalAmount = (e) => {
        setTotal(e.target.value);
    }

    const percentCalc = (e, setPercent) => {
        const percent = (e.target.value / total * 100);
        setPercent(percent);
    };

    const description = (e) => {
        setDesc(e.target.value);
    }

    const submitData = (e) => {
        const data = [{ label: "Donations", value: percent1.toString() },
                      { label: "Compost", value: percent2.toString() },
                      { label: "Partners", value: percent3.toString() },
                      { label: "Farmers", value: percent4.toString() },
                      { label: "Gardens", value: percent5.toString() },
                      { label: "Landfill", value: percent6.toString() },
                      { label: "Other", value: percent7.toString() }];

        setCharts([
            <MDBCard className="mb-5">
                <MDBCardBody>
                    <PieChart
                        data = {data}
                        desc = {desc}
                        innerRadius = {60}
                        outerRadius = {100}
                    />
                </MDBCardBody>
            </MDBCard>,
        charts]);
        e.preventDefault();
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
            <div className="mb-3 align-content-between">
                <h2 className="d-inline">Tracker Page</h2>
                {/*<MDBBtn className="float-end">Generate Report</MDBBtn>*/}
            </div>
            <MDBCard className="mb-5 bg-pale-blue">
                <MDBCardBody>
                    <MDBRow tag="form" className="g-3" between>
                        <MDBCol md="6">
                            <MDBDropdown group>
                                <MDBDropdownToggle>Waste Category</MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem link>Produce</MDBDropdownItem>
                                    <MDBDropdownItem link>Meat</MDBDropdownItem>
                                    <MDBDropdownItem link>Dairy</MDBDropdownItem>
                                    <MDBDropdownItem link>Bread</MDBDropdownItem>
                                    <MDBDropdownItem link>Canned Food</MDBDropdownItem>
                                    <MDBDropdownItem link>Reclaimed Food</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBCol>
                        <MDBCol md="6">
                            <div className="input-group has-validation" onChange={totalAmount}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Total Amount"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="12" onChange={description}>
                            <MDBTextArea
                                name="desc"
                                label="Description"
                                className="bg-white"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent1)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Donations"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent1.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent2)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Compost"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent2.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent3)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Partners"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent3.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent4)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Farmers"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent4.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent5)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Gardens"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent5.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent6)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Landfill"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent6.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="4">
                            <div className="input-group has-validation" onChange={(event) => percentCalc(event, setPercent7)}>
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Other"
                                required
                                />
                                <span className="input-group-text bg-white">
                                    lbs
                                </span>
                                <div className="invalid-feedback">Please enter an amount.</div>
                            </div>
                        </MDBCol>
                        <MDBCol md="2">
                            <p className="m-0 p-1">= {percent7.toFixed(2)}%</p>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBBtn className="float-end" color="success" onClick={submitData}>
                                Submit
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

            {charts}
        </MDBContainer>
        );
}

export default Tracker;