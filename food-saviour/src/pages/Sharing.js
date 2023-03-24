import React, {useEffect, useState} from "react";
import "../css/sharing.css";
import Navbar from "../components/Navbar.js";
import PieChart from "../components/PieChart";
import axiosInstance from "../axios";
import "../css/sharing.css";
import {
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody
}
    from "mdb-react-ui-kit";
import LoadingComponent from "../util/Loading";
import Generate from "../util/Generate";

let wasteId = [];
let orgId = [];
function Sharing(props) {

    const {WasteData, OrgData} = props;

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
    };

    const checkHandler = (e) => {
        setIsChecked(!isChecked);
    }    

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
                label: "Donations", value: (100 * amount1 / total).toString(), amount: amount1.toString()},
                {label: "Compost", value: (100 * amount2 / total).toString(), amount: amount2.toString()},
                {label: "Partners", value: (100 * amount3 / total).toString(), amount: amount3.toString()},
                {label: "Farmers", value: (100 * amount4 / total).toString(), amount: amount4.toString()},
                {label: "Gardens", value: (100 * amount5 / total).toString(), amount: amount5.toString()},
                {label: "Landfill", value: (100 * amount6 / total).toString(), amount: amount6.toString()},
                {label: "Other", value: (100 * amount7 / total).toString(), amount: amount7.toString()}];

            setAppState({ loading: false, data: new_data});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = `filteredTrackerData/?`;
        console.log(wasteId);
        console.log(orgId);
        wasteId.forEach((item) => {url += 'waste_type=' + item + '&'});
        orgId.forEach((item) => {url += 'group=' + item + '&'});
        axiosInstance.get(url).then((res) =>{
            processData(res.data);
        });

    };

    if (!WasteData || !OrgData) return;

    return (
        <div className="blue overflow-hidden mw-100 min-vh-100 col">
            <Navbar></Navbar>
            <div className="w-80 m-auto">
                <div className="text-center">
                    <img src="/images/logo.png" height="80px"/>
                    <h1 className="fs-1 text-center mt-1 fw-bold">Sharing</h1>
                    <p className="text-center">Have items to share? Need items? You've found the right place!</p>
                </div>
                <div className="row justify-content-center m-auto">
                    <div className="bg-lblue w-32 p-4 ch-25 mx-1 rounded-4 overflow-auto">
                        <div>
                            <h1 className="fw-bold fs-4">Organizations</h1>
                            
                            <div>
                                <input type="checkbox" /> UBC
                            </div>
                            <div>
                                <input type="checkbox" /> Farmer's market
                            </div>
                            <div>
                                <input type="checkbox" /> Food bank
                            </div>
                        </div>
                    </div>
                    <div className="bg-lblue w-32 ch-25 p-4 mx-1 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Organization</h1>
                            {OrgData.map((data) => {
                                return (
                                    <div key={data.id}>
                                        <input type="checkbox" onChange={handleChange} name="org" value={data.id} /> {data.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
                <div className="row justify-content-center mt-2 mb-2">
                    <div className='w-25 justify-content-center d-flex btn text-white bg-dblue m-2' onClick={handleSubmit}>
                        Generate data
                    </div>
                    
                </div>
                <div className="d-flex flex-wrap justify-content-center">
                <div className="result">
                    Above checkbox is {isChecked ? "checked" : "unchecked"}.
                </div>    
                    <div className="bg-lblue w-100 p-4 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Generated graphs</h1>
                            <Loading isLoading={appState.loading} data={appState.data} />
                        </div>
                    </div>

                    <footer className="footer">
                        <p className="text-footer">
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Sharing;
