import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import PieChart from "../components/PieChart.js";
import Navbar from "../components/Navbar.js";
import "../css/tracker.css";
import Sidebar from "../components/Sidebar.js";
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

function Tracker() {
    useEffect(() => {
        getData();
        displayData();
    }, []);

    const [data, setData] = useState([]);

    const getData = () => {
        axiosInstance
            .get("trackerData/")
            .then((response) => {
                const allData = response.data;

                for (let i = 0; i < allData.length; i++) {
                    if (allData[i].user === 1) {
                        setData([allData[i], data]);
                    }
                }
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const displayData = () => {
        for (let i = 0; i < data.length - 1; i++) {
            setCharts([
                <MDBCard className="mb-5">
                    <MDBCardBody>
                        <p className="mb-4 fw-bold border-bottom">{type}</p>
                        <PieChart
                            data={data[i].data}
                            innerRadius={50}
                            outerRadius={100}
                        />
                        <p className="mt-4 mb-3">{data[i].desc}</p>
                        <p className="m-0 small float-end">{new Date().toString()}</p>
                    </MDBCardBody>
                </MDBCard>,
                charts]);
        }
    }

    const [type, setType] = useState("");
    const [total, setTotal] = useState(0);
    const [desc, setDesc] = useState("no description");
    const [charts, setCharts] = useState([]);

    const [percent1, setPercent1] = useState(0), [amount1, setAmount1] = useState(0);
    const [percent2, setPercent2] = useState(0), [amount2, setAmount2] = useState(0);
    const [percent3, setPercent3] = useState(0), [amount3, setAmount3] = useState(0);
    const [percent4, setPercent4] = useState(0), [amount4, setAmount4] = useState(0);
    const [percent5, setPercent5] = useState(0), [amount5, setAmount5] = useState(0);
    const [percent6, setPercent6] = useState(0), [amount6, setAmount6] = useState(0);
    const [percent7, setPercent7] = useState(0), [amount7, setAmount7] = useState(0);

    const wasteType = (e) => {
        setType(e.target.innerHTML);
    }

    const totalAmount = (e) => {
        setTotal(e.target.value);
    }

    const percentCalc = (e, setPercent, setAmount) => {
        const percent = (e.target.value / total * 100);
        setPercent(percent);
        setAmount(e.target.value);
    };

    const description = (e) => {
        setDesc(e.target.value);
    }

    const submitData = (e) => {
        const newdata = [{label: "Donations", value: percent1.toString(), amount: amount1.toString()},
            {label: "Compost", value: percent2.toString(), amount: amount2.toString()},
            {label: "Partners", value: percent3.toString(), amount: amount3.toString()},
            {label: "Farmers", value: percent4.toString(), amount: amount4.toString()},
            {label: "Gardens", value: percent5.toString(), amount: amount5.toString()},
            {label: "Landfill", value: percent6.toString(), amount: amount6.toString()},
            {label: "Other", value: percent7.toString(), amount: amount7.toString()}];

        console.log(newdata);

        axiosInstance
            .post("trackerData/", {
                data: newdata,
                user: 1,
                waste_type: 1,
                description: desc,
            })
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.error(`Error: ${error}`));

        setCharts([
            <MDBCard className="mb-5">
                <MDBCardBody>
                    <p className="mb-4 fw-bold border-bottom">{type}</p>
                    <PieChart
                        data={newdata}
                        innerRadius={50}
                        outerRadius={100}
                    />
                    <p className="mt-4 mb-3">{desc}</p>
                    <p className="m-0 small float-end">{new Date().toString()}</p>
                </MDBCardBody>
            </MDBCard>,
            charts]);
        e.preventDefault();
    }

    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <div className="mb-3 align-content-between">
                    <h2 className="d-inline">Tracker Page</h2>
                    {/*<MDBBtn className="float-end">Generate Report</MDBBtn>*/}
                </div>
                <MDBRow>
                    <MDBCol md="3">
                        <MDBCard className="mb-5">
                            <Sidebar></Sidebar>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBCard className="mb-5 bg-pale-blue">
                            <MDBCardBody>
                                <MDBRow tag="form" className="g-3" between>
                                    <MDBCol md="5">
                                        <MDBDropdown group>
                                            <MDBDropdownToggle onClick={(event) => event.preventDefault()}>Waste
                                                Category</MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem link onClick={wasteType}>Produce</MDBDropdownItem>
                                                <MDBDropdownItem link onClick={wasteType}>Meat</MDBDropdownItem>
                                                <MDBDropdownItem link onClick={wasteType}>Dairy</MDBDropdownItem>
                                                <MDBDropdownItem link onClick={wasteType}>Bread</MDBDropdownItem>
                                                <MDBDropdownItem link onClick={wasteType}>Canned Food</MDBDropdownItem>
                                                <MDBDropdownItem link onClick={wasteType}>Reclaimed
                                                    Food</MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBCol>
                                    <MDBCol md="3">
                                        <p className="m-0 p-1 float-end">Total Amount:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
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
                                        <MDBInput
                                            name="desc"
                                            label="Description"
                                            className="bg-white"
                                            required
                                        />
                                    </MDBCol>
                                    <MDBCol md="12">
                                        <p className="m-0 fw-bold border-bottom border-secondary">Distributed
                                            Amounts</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Donations:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent1, setAmount1)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent1.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Compost:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent2, setAmount2)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent2.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Partners:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent3, setAmount3)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent3.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Farmers:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent4, setAmount4)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent4.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Gardens:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent5, setAmount5)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent5.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Landfill:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent6, setAmount6)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent6.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <p className="m-0 p-1 float-end">Other:</p>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <div className="input-group has-validation"
                                             onChange={(event) => percentCalc(event, setPercent7, setAmount7)}>
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
                                    <MDBCol md="4">
                                        <p className="m-0 p-1">= {percent7.toFixed(2)}%</p>
                                    </MDBCol>
                                    <MDBCol md="12">
                                        <MDBBtn className="float-end" color="success" onClick={submitData}>
                                            Submit
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        {charts}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}

export default Tracker;