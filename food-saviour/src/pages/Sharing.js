import React, {useEffect, useState} from "react";
import "../css/sharing.css";
import Navbar from "../components/Navbar.js";
import axiosInstance from "../axios";
import "../css/sharing.css";
import {
    MDBContainer,
    MDBCheckbox,
    MDBRow,
    MDBCol,
    MDBBtn,
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
                    return value != e.target.value;
                });
            }
        }
        if (e.target.name === 'org') {
            if (!orgId.includes(e.target.value)) {
                orgId.push(e.target.value);
            } else {
                orgId = orgId.filter(function (value) {
                    return value != e.target.value;
                });
            }
        }
        if (e.target.name === 'role') {
            if (!roleId.includes(e.target.value)) {
                roleId.push(e.target.value);
            } else {
                roleId = roleId.filter(function (value) {
                    return value != e.target.value;
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
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = `filteredTrackerData/?`;
        console.log(wasteId);
        console.log(orgId);
        console.log(roleId);
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
        <MDBContainer fluid className="blue min-vh-100">
            <Navbar/>
            <MDBContainer className="w-80 m-auto">
                <MDBContainer className="text-center">
                    <img src="/images/logo.png" height="80px"/>
                    <h1 className="fs-1 text-center mt-1 fw-bold">Sharing</h1>
                    <p className="text-center">
                        Have items to share? Need items? You've found the right place!
                    </p>
                </MDBContainer>
                <MDBRow className="justify-content-center m-auto">
                    <MDBCol
                        className="bg-lblue p-4 ch-25 mx-1 rounded-4 overflow-auto" md="3"
                    >
                        <div>
                            <h1 className="fw-bold fs-4">Waste Category</h1>
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
                        </div>
                    </MDBCol>
                    <MDBCol className="bg-lblue ch-25 p-4 mx-1 rounded-4 overflow-auto" md="3">
                        <div>
                            <h1 className="fw-bold fs-4">Organization</h1>
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
                        </div>
                    </MDBCol>
                    <MDBCol className="bg-lblue ch-25 p-4 mx-1 rounded-4 overflow-auto" md="3">
                        <div>
                            <h1 className="fw-bold fs-4">Roles</h1>
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
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="justify-content-center mt-2 mb-2">
                    <MDBBtn className="w-25 m-2" color="primary" onClick={handleSubmit}>
                        Generate data
                    </MDBBtn>
                </MDBRow>
                <MDBRow className="justify-content-center">
                    <MDBCol className="bg-lblue w-100 p-4 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Generated Graphs</h1>
                            <Loading isLoading={appState.loading} data={appState.data}/>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBContainer className="footer">
                    <p className="text-footer"></p>
                </MDBContainer>
            </MDBContainer>
        </MDBContainer>
    );
}

export default Sharing;
