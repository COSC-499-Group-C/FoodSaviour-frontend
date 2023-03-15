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
    const [charts, setCharts] = useState([]);

    useEffect(() => {
        getWasteType();
    }, []);

    const getWasteType = () => {
        axiosInstance
            .get("wasteType/")
            .then((response) => {
                let types = response.data;

                getData(types);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const getData = (types) => {
        axiosInstance
            .get("trackerData/")
            .then((response) => {
                let data = response.data;

                displayData(types, data);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const displayData = (types, data) => {
        let display = [];

        for (let i = 0; i < data.length; i++) {
            const type_name = types[data[i].waste_type - 1].name;

            const total = +data[i].donations + +data[i].compost + +data[i].partners + +data[i].farmers + +data[i].gardens + +data[i].landfill + +data[i].other;

            const percent1 = (data[i].donations / total * 100);
            const percent2 = (data[i].compost / total * 100);
            const percent3 = (data[i].partners / total * 100);
            const percent4 = (data[i].farmers / total * 100);
            const percent5 = (data[i].gardens / total * 100);
            const percent6 = (data[i].landfill / total * 100);
            const percent7 = (data[i].other / total * 100);

            const pie_data = [{label: "Donations", value: percent1.toString(), amount: data[i].donations},
            {label: "Compost", value: percent2.toString(), amount: data[i].compost},
            {label: "Partners", value: percent3.toString(), amount: data[i].partners},
            {label: "Farmers", value: percent4.toString(), amount: data[i].farmers},
            {label: "Gardens", value: percent5.toString(), amount: data[i].gardens},
            {label: "Landfill", value: percent6.toString(), amount: data[i].landfill},
            {label: "Other", value: percent7.toString(), amount: data[i].other}];

            display.push(
                <MDBCard className="mb-5">
                    <MDBCardBody>
                        <p className="mb-4 fw-bold border-bottom">{type_name}</p>
                        <PieChart
                            data={pie_data}
                            innerRadius={50}
                            outerRadius={100}
                        />
                        <p className="mt-4 mb-3">{data[i].description}</p>
                        <p className="m-0 small float-end">{new Date(data[i].created_at).toString()}</p>
                    </MDBCardBody>
                </MDBCard>
            );
        }

         setCharts(display);
    }

    const [type, setType] = useState("Waste Category");
    const [type_id, setType_id] = useState(1);
    const [total, setTotal] = useState();
    const [entered, setEntered] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [err_msg, setErr_msg] = useState("");
    const [desc, setDesc] = useState("");

    const [percent1, setPercent1] = useState(0), [amount1, setAmount1] = useState();
    const [percent2, setPercent2] = useState(0), [amount2, setAmount2] = useState();
    const [percent3, setPercent3] = useState(0), [amount3, setAmount3] = useState();
    const [percent4, setPercent4] = useState(0), [amount4, setAmount4] = useState();
    const [percent5, setPercent5] = useState(0), [amount5, setAmount5] = useState();
    const [percent6, setPercent6] = useState(0), [amount6, setAmount6] = useState();
    const [percent7, setPercent7] = useState(0), [amount7, setAmount7] = useState();

    const wasteType = (e, waste_type_id) => {
        setType(e.target.innerHTML);
        setType_id(waste_type_id);

        e.preventDefault();
    }

    const totalAmount = (e) => {
        setTotal(e.target.value);
    }

    const percentCalc = (e, setPercent, setAmount, i) => {
        const percent = (e.target.value / total * 100);
        setPercent(percent);
        setAmount(e.target.value);

        let arr = [...entered];
        arr[i] = e.target.value;
        setEntered(arr);
    };

    const description = (e) => {
        setDesc(e.target.value);
    }

    const validateForm = (e) => {
        e.preventDefault();
        let type = document.getElementById("type");
        let inputs = document.getElementsByTagName("input");

        if (type.innerHTML === "Waste Category") {
            setErr_msg("Please specify a waste category.");
            return false;
        }

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == null || inputs[i].value === "") {
                setErr_msg("Please fill out all fields.");
                return false;
            }
        }

        submitData(e);
    }

    const submitData = (e) => {
        const new_data = [{label: "Donations", value: percent1.toString(), amount: amount1.toString()},
            {label: "Compost", value: percent2.toString(), amount: amount2.toString()},
            {label: "Partners", value: percent3.toString(), amount: amount3.toString()},
            {label: "Farmers", value: percent4.toString(), amount: amount4.toString()},
            {label: "Gardens", value: percent5.toString(), amount: amount5.toString()},
            {label: "Landfill", value: percent6.toString(), amount: amount6.toString()},
            {label: "Other", value: percent7.toString(), amount: amount7.toString()}];

        if (+total === entered.reduce((sum,i) =>  sum = sum + +i, 0)) {

            const date = new Date();

            axiosInstance
                .post("trackerData/", {
                    user: localStorage.getItem("currUserId"),
                    waste_type: type_id,
                    description: desc,
                    donations: amount1,
                    compost: amount2,
                    partners: amount3,
                    farmers: amount4,
                    gardens: amount5,
                    landfill: amount6,
                    other: amount7,
                    created_at: date
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
                            data={new_data}
                            innerRadius={50}
                            outerRadius={100}
                        />
                        <p className="mt-4 mb-3">{desc}</p>
                        <p className="m-0 small float-end">{date.toString()}</p>
                    </MDBCardBody>
                </MDBCard>,
                charts]);

            clearForm(e);
        } else {
            setErr_msg("Entered amount does not equal total amount.");
        }

        e.preventDefault();
    }

    const clearForm = (e) => {
        setType("Waste Category");
        setType_id(1);
        setTotal("");
        setEntered([0, 0, 0, 0, 0, 0, 0]);
        setErr_msg("");
        setDesc("");

        setPercent1(0); setAmount1("");
        setPercent2(0); setAmount2("");
        setPercent3(0); setAmount3("");
        setPercent4(0); setAmount4("");
        setPercent5(0); setAmount5("");
        setPercent6(0); setAmount6("");
        setPercent7(0); setAmount7("");

        e.preventDefault();
    }

    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <div className="mb-3 align-content-between">
                    <h2 className="d-inline">Tracker Page</h2>
                </div>
                <MDBCard className="mb-5 bg-pale-blue">
                    <MDBCardBody>
                        <MDBRow tag="form" className="g-3" between>
                            <MDBCol md="5">
                                <MDBDropdown group>
                                    <MDBDropdownToggle id="type" onClick={(event) => event.preventDefault()}>{type}</MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 1)}>Produce</MDBDropdownItem>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 2)}>Meat</MDBDropdownItem>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 3)}>Dairy</MDBDropdownItem>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 4)}>Bread</MDBDropdownItem>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 5)}>Canned Food</MDBDropdownItem>
                                        <MDBDropdownItem link onClick={(event) => wasteType(event, 6)}>Reclaimed Food</MDBDropdownItem>
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
                                        value={total}
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
                                    className="bg-white has-validation"
                                    value={desc}
                                    required
                                />
                                <div className="invalid-feedback">Please provide a description.</div>
                            </MDBCol>
                            <MDBCol md="12">
                                <p className="m-0 fw-bold border-bottom border-secondary">Distributed Amounts</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Donations:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group has-validation"
                                     onChange={(event) => percentCalc(event, setPercent1, setAmount1, 0)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Donations"
                                        value={amount1}
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
                                     onChange={(event) => percentCalc(event, setPercent2, setAmount2, 1)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Compost"
                                        value={amount2}
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
                                     onChange={(event) => percentCalc(event, setPercent3, setAmount3, 2)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Partners"
                                        value={amount3}
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
                                     onChange={(event) => percentCalc(event, setPercent4, setAmount4, 3)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Farmers"
                                        value={amount4}
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
                                     onChange={(event) => percentCalc(event, setPercent5, setAmount5, 4)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Gardens"
                                        value={amount5}
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
                                     onChange={(event) => percentCalc(event, setPercent6, setAmount6, 5)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Landfill"
                                        value={amount6}
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
                                     onChange={(event) => percentCalc(event, setPercent7, setAmount7, 6)}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Other"
                                        value={amount7}
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
                            <MDBCol md="4">
                                <p className="m-0 p-1 fw-bold float-end">Entered Amount:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 text-center border-top border-secondary">{entered.reduce((sum,i) =>  sum = sum + +i, 0).toFixed(2)} lbs</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">{err_msg}</p>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBBtn className="float-start" color="danger" onClick={clearForm}>
                                    Clear
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBBtn className="float-end" color="success" onClick={validateForm}>
                                    Submit
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
                {charts}
            </MDBContainer>
        </div>
    );
}

export default Tracker;