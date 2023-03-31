import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import PieChart from "../components/PieChart.js";
import Navbar from "../components/Navbar.js";
import Documentation from "../components/Documentation.js";
import "../css/tracker.css";
import {
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody
}
    from "mdb-react-ui-kit";

function Tracker(props) {
    const { WasteData } = props;
    const [charts, setCharts] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axiosInstance
            .get("trackerData/")
            .then((response) => {
                let data = response.data;

                displayData(data);
            })
            .catch(error => console.error(`Error: ${error}`));
    }

    const displayData = (data) => {
        let display = [];

        for (let i = 0; i < data.length; i++) {
            const type_name = WasteData[data[i].waste_type - 1].name;

            const total = +data[i].donations + +data[i].compost + +data[i].partners + +data[i].farmers + +data[i].gardens + +data[i].landfill + +data[i].other;

            const percent1 = (data[i].donations / total * 100);
            const percent2 = (data[i].compost / total * 100);
            const percent3 = (data[i].partners / total * 100);
            const percent4 = (data[i].farmers / total * 100);
            const percent5 = (data[i].gardens / total * 100);
            const percent6 = (data[i].landfill / total * 100);
            const percent7 = (data[i].other / total * 100);

            const pie_data = [{ label: "Donations", value: percent1.toString(), amount: data[i].donations },
            { label: "Compost", value: percent2.toString(), amount: data[i].compost },
            { label: "Partners", value: percent3.toString(), amount: data[i].partners },
            { label: "Farmers", value: percent4.toString(), amount: data[i].farmers },
            { label: "Gardens", value: percent5.toString(), amount: data[i].gardens },
            { label: "Landfill", value: percent6.toString(), amount: data[i].landfill },
            { label: "Other", value: percent7.toString(), amount: data[i].other }];

            display.push(
                <MDBCard className="mb-5">
                    <MDBCardBody>
                        <p className="mb-4 fw-bold border-bottom">{type_name}</p>
                        <PieChart
                            data={pie_data}
                            innerRadius={60}
                            outerRadius={120}
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
    const [total, setTotal] = useState("");
    const [entered, setEntered] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [err_msg, setErr_msg] = useState("");
    const [desc, setDesc] = useState("");

    const [percent1, setPercent1] = useState(NaN), [amount1, setAmount1] = useState();
    const [percent2, setPercent2] = useState(NaN), [amount2, setAmount2] = useState();
    const [percent3, setPercent3] = useState(NaN), [amount3, setAmount3] = useState();
    const [percent4, setPercent4] = useState(NaN), [amount4, setAmount4] = useState();
    const [percent5, setPercent5] = useState(NaN), [amount5, setAmount5] = useState();
    const [percent6, setPercent6] = useState(NaN), [amount6, setAmount6] = useState();
    const [percent7, setPercent7] = useState(NaN), [amount7, setAmount7] = useState();

    const wasteType = (e, waste_type_id) => {
        setType(e.target.innerHTML);
        setType_id(waste_type_id);

        if (e.target.innerHTML !== "Waste Category") {
            let type = document.getElementById("type");
            type.classList.remove("border");
            type.classList.remove("border-danger");
        }

        e.preventDefault();
    }

    const totalAmount = (e) => {
        setTotal(e.target.value);

        if (e.target.value != null && e.target.value !== "") {
            e.target.classList.remove("border");
            e.target.classList.remove("border-danger");
        }
    }

    const percentCalc = (e, setPercent, setAmount, i) => {
        if (total !== "") {
            const percent = (e.target.value / total * 100);
            setPercent(percent);
        } else {
            setPercent(NaN);
        }
        setAmount(e.target.value);

        let arr = [...entered];
        arr[i] = e.target.value;
        setEntered(arr);

        if (e.target.value != null && e.target.value !== "") {
            e.target.classList.remove("border");
            e.target.classList.remove("border-danger");
        }

        if (+total === arr.reduce((sum, i) => sum = sum + +i, 0)) {
            let entered_amount = document.getElementById("entered");
            entered_amount.classList.remove("fw-bold");
            entered_amount.classList.remove("text-danger");
        }
    };

    const description = (e) => {
        setDesc(e.target.value);

        if (e.target.value != null && e.target.value !== "") {
            e.target.classList.remove("border");
            e.target.classList.remove("border-danger");
        }
    }

    const validateForm = (e) => {
        e.preventDefault();
        let type = document.getElementById("type");
        let inputs = document.getElementsByTagName("input");
        let entered_amount = document.getElementById("entered");

        if (type.innerHTML === "Waste Category") {
            document.getElementById("err_msg").classList.remove("d-none");
            type.classList.add("border");
            type.classList.add("border-danger");
            setErr_msg("Please specify a waste category.");
            return false;
        }

        let empty = false;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == null || inputs[i].value === "") {
                inputs[i].classList.add("border");
                inputs[i].classList.add("border-danger");
                empty = true;
            }
        }

        if (empty) {
            document.getElementById("err_msg").classList.remove("d-none");
            setErr_msg("Please fill out all fields.");
            return false;
        }

        if (+total !== entered.reduce((sum, i) => sum = sum + +i, 0)) {
            document.getElementById("err_msg").classList.remove("d-none");
            entered_amount.classList.add("fw-bold");
            entered_amount.classList.add("text-danger");
            setErr_msg("Entered amount does not equal total amount.");
            return false;
        }

        document.getElementById("err_msg").classList.add("d-none");
        submitData(e);
    }

    const submitData = (e) => {
        const total = +amount1 + +amount2 + +amount3 + +amount4 + +amount5 + +amount6 + +amount7;

        const percent1 = (amount1 / total * 100);
        const percent2 = (amount2 / total * 100);
        const percent3 = (amount3 / total * 100);
        const percent4 = (amount4 / total * 100);
        const percent5 = (amount5 / total * 100);
        const percent6 = (amount6 / total * 100);
        const percent7 = (amount7 / total * 100);

        const new_data = [{ label: "Donations", value: percent1.toString(), amount: amount1 },
        { label: "Compost", value: percent2.toString(), amount: amount2 },
        { label: "Partners", value: percent3.toString(), amount: amount3 },
        { label: "Farmers", value: percent4.toString(), amount: amount4 },
        { label: "Gardens", value: percent5.toString(), amount: amount5 },
        { label: "Landfill", value: percent6.toString(), amount: amount6 },
        { label: "Other", value: percent7.toString(), amount: amount7 }];

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

        console.log(new_data);
        setCharts([
            <MDBCard className="mb-5">
                <MDBCardBody>
                    <p className="mb-4 fw-bold border-bottom">{type}</p>
                    <PieChart
                        data={new_data}
                        innerRadius={60}
                        outerRadius={120}
                    />
                    <p className="mt-4 mb-3">{desc}</p>
                    <p className="m-0 small float-end">{date.toString()}</p>
                </MDBCardBody>
            </MDBCard>,
            charts]);

        clearForm(e);

        e.preventDefault();
    }

    const clearForm = (e) => {
        setType("Waste Category");
        setType_id(1);
        setTotal("");
        setEntered([0, 0, 0, 0, 0, 0, 0]);
        setDesc("");

        let type = document.getElementById("type");
        let inputs = document.getElementsByTagName("input");
        let entered_amount = document.getElementById("entered");

        type.classList.remove("border");
        type.classList.remove("border-danger");

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("border");
            inputs[i].classList.remove("border-danger");
        }

        entered_amount.classList.remove("fw-bold");
        entered_amount.classList.remove("text-danger");

        document.getElementById("err_msg").classList.add("d-none");
        setErr_msg("");

        setPercent1(NaN); setAmount1("");
        setPercent2(NaN); setAmount2("");
        setPercent3(NaN); setAmount3("");
        setPercent4(NaN); setAmount4("");
        setPercent5(NaN); setAmount5("");
        setPercent6(NaN); setAmount6("");
        setPercent7(NaN); setAmount7("");

        e.preventDefault();
    }
    if (!WasteData) return;
    return (
        <div>
            <Navbar></Navbar>
            <MDBContainer className="p-3 mt-7 mb-5 d-flex flex-column w-50">
                <h2 className="d-inline mb-3">Tracker Page</h2>
                <MDBCard className="mb-5 bg-pale-blue">
                    <MDBCardBody>
                        <MDBRow tag="form" className="g-3" between>
                            <MDBCol md="8">
                                <MDBDropdown group>
                                    <MDBDropdownToggle id="type" onClick={(event) => event.preventDefault()}>{type}</MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {WasteData.map((list) => {
                                            return (
                                                <MDBDropdownItem link onClick={(event) => wasteType(event, list.id)}>{list.name}</MDBDropdownItem>
                                            );
                                        })}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBCol>
                            <MDBCol md="4" onChange={description}>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="form-control"
                                    value={desc}
                                    required
                                />
                            </MDBCol>
                            <MDBCol md="12">
                                <hr></hr>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 fw-bold float-end">Total Amount:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group" onChange={totalAmount}>
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4"></MDBCol>
                            <MDBCol md="4"></MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 fw-bold text-center border-bottom border-secondary"></p>
                            </MDBCol>
                            <MDBCol md="4"></MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Donations:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent1.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Compost:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent2.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Partners:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent3.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Farmers:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent4.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Gardens:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent5.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Landfill:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent6.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 float-end">Other:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <div className="input-group"
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
                                </div>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1">= {percent7.toFixed(2)}%</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p className="m-0 p-1 pt-3 fw-bold float-end">Entered Amount:</p>
                            </MDBCol>
                            <MDBCol md="4">
                                <p id="entered" className="m-0 p-1 pt-3 text-center border-top border-secondary">{entered.reduce((sum, i) => sum = sum + +i, 0).toFixed(2)} lbs</p>
                            </MDBCol>
                            <MDBCol md="4"></MDBCol>
                            <MDBCol md="12">
                                <p id="err_msg" className="p-2 text-danger rounded d-none"
                               style={{backgroundColor: "#f9e1e5"}}>{err_msg}</p>
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
                <Documentation className="text-decoration-none fs-5"></Documentation>
            </MDBContainer>
        </div>
    );
}

export default Tracker;