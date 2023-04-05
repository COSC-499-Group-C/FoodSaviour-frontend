import React, { useState } from "react";
import axiosInstance from "../axios";
import Navbar from "../components/Navbar.js";
import Documentation from "../components/Documentation.js";
import "../css/sharing.css";
import {
    MDBContainer,
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
}
    from "mdb-react-ui-kit";
import LoadingComponent from "../util/Loading";
import Generate from "../util/Generate";

let wasteId = [];
let orgId = [];
let roleId =[];

function Sharing(props) {

    const {WasteData, OrgData, RoleData} = props;

    const [appState, setAppState] = useState({
        loading: false,
        data: [],
    });

    const Loading = LoadingComponent(Generate);

    const handleChange = (e) => {
        if (e.target.name === 'waste') {
            if (!wasteId.includes(e.target.value)) {
                wasteId.push(e.target.value);
            } else {
                wasteId = wasteId.filter(function (value) {
                    return value !== e.target.value;
                });
            }
        }
        if (e.target.name === 'org') {
            if (!orgId.includes(e.target.value)) {
                orgId.push(e.target.value);
            } else {
                orgId = orgId.filter(function (value) {
                    return value !== e.target.value;
                });
            }
        }
        if (e.target.name === 'role') {
            if (!roleId.includes(e.target.value)) {
                roleId.push(e.target.value);
            } else {
                roleId = roleId.filter(function (value) {
                    return value !== e.target.value;
                });
            }
        }
    };

    const processData = (raw) => {
        if (raw.length > 0) {
            let amount1 = 0, amount2 = 0, amount3 = 0, amount4 = 0, amount5 = 0, amount6 = 0, amount7 = 0;
            let total = 0;
            for (let i = 0; i < raw.length; i++) {
                amount1 += parseFloat(raw[i].donations);
                amount2 += parseFloat(raw[i].compost);
                amount3 += parseFloat(raw[i].partners);
                amount4 += parseFloat(raw[i].farmers);
                amount5 += parseFloat(raw[i].gardens);
                amount6 += parseFloat(raw[i].landfill);
                amount7 += parseFloat(raw[i].other);
                total += (parseFloat(raw[i].donations) + parseFloat(raw[i].compost) + parseFloat(raw[i].partners)
                    + parseFloat(raw[i].farmers) + parseFloat(raw[i].gardens) + parseFloat(raw[i].landfill)
                    + parseFloat(raw[i].other));
            }

            const new_data = [{
                label: "Donations", value: (100 * amount1 / total).toString(), amount: amount1.toString()
            },
                {label: "Compost", value: (100 * amount2 / total).toString(), amount: amount2.toString()},
                {label: "Partners", value: (100 * amount3 / total).toString(), amount: amount3.toString()},
                {label: "Farmers", value: (100 * amount4 / total).toString(), amount: amount4.toString()},
                {label: "Gardens", value: (100 * amount5 / total).toString(), amount: amount5.toString()},
                {label: "Landfill", value: (100 * amount6 / total).toString(), amount: amount6.toString()},
                {label: "Other", value: (100 * amount7 / total).toString(), amount: amount7.toString()}];

            setAppState({loading: false, data: new_data});
        }else {
            setAppState({loading: false, data: []});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = `filteredTrackerData/?`;
        wasteId.forEach((item) => {
            url += 'waste_type=' + item + '&'
        });
        orgId.forEach((item) => {
            url += 'group=' + item + '&'
        });
        roleId.forEach((item) => {
            url += 'role=' + item + '&'
        });
        axiosInstance.get(url).then((res) => {
            processData(res.data);
        });

    };

    if (!WasteData || !OrgData || !RoleData) return;

    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="p-3 mt-7 mb-5 d-flex flex-column w-50">
                <h1 className="mb-3 fw-bold text-center">Sharing Page</h1>
                <MDBRow>
                    <MDBCol md="4">
                        <MDBCard className="h-15 p-3 bg-lblue overflow-auto">
                            <p className="fw-bold fs-4">Waste Category</p>
                            {WasteData.map((data) => {
                                return (
                                    <div key={data.id} className="mb-0">
                                        <MDBCheckbox
                                            name="waste"
                                            value={data.id}
                                            label={data.name}
                                            onChange={handleChange}
                                            inline
                                        />
                                    </div>
                                );
                            })}
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="h-15 p-3 bg-blue overflow-auto">
                            <p className="fw-bold fs-4">Organization</p>
                            {OrgData.map((data) => {
                                return (
                                    <div key={data.id} className="mb-0">
                                        <MDBCheckbox
                                            name="org"
                                            value={data.id}
                                            label={data.name}
                                            onChange={handleChange}
                                            inline
                                        />
                                    </div>
                                );
                            })}
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="h-15 p-3 bg-purple overflow-auto">
                            <p className="fw-bold fs-4">Roles</p>
                            {RoleData.map((data) => {
                                return (
                                    <div key={data.id} className="mb-0">
                                        <MDBCheckbox
                                            name="role"
                                            value={data.id}
                                            label={data.name}
                                            onChange={handleChange}
                                            inline
                                        />
                                    </div>
                                );
                            })}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center m-3">
                    <MDBBtn className="w-25" color="primary" onClick={handleSubmit}>
                        Generate Data
                    </MDBBtn>
                </MDBRow>
                <MDBRow className="justify-content-center">
                            <Loading isLoading={appState.loading} data={appState.data}></Loading>
                </MDBRow>
                <Documentation className="text-decoration-none fs-5"></Documentation>
            </MDBContainer>
        </div>
    );
}

export default Sharing;
