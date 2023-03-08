import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import PieChart from "../components/PieChart.js";
import Navbar from "../components/Navbar.js";
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

function Sharing() {
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
        const newdata = [{ label: "Donations", value: percent1.toString(), amount: amount1.toString() },
        { label: "Compost", value: percent2.toString(), amount: amount2.toString() },
        { label: "Partners", value: percent3.toString(), amount: amount3.toString() },
        { label: "Farmers", value: percent4.toString(), amount: amount4.toString() },
        { label: "Gardens", value: percent5.toString(), amount: amount5.toString() },
        { label: "Landfill", value: percent6.toString(), amount: amount6.toString() },
        { label: "Other", value: percent7.toString(), amount: amount7.toString() }];

        console.log(newdata);

        axiosInstance
            .post("sharingData/", {
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
        <div className="blue overflow-hidden mw-100 min-vh-100 col">
            <div className="w-80 m-auto">
                <div className="text-center">
                    <img src="/images/logo.png" height="80px" />
                    <h1 className="fs-1 text-center mt-1 fw-bold text-white">Sharing</h1>
                    <p className="text-center text-white">Have items to share? Need items? You've found the right place!</p>
                </div>
                <div className="row justify-content-center justify-content-between m-auto mb-3">
                    <div className="bg-white w-30 p-4 ch-25 rounded-4 overflow-auto">
                        <h1 className="fw-bold fs-4">Waste category</h1>
                        <input type="checkbox" /> Produce <br />
                        <input type="checkbox" /> Frozen food <br />
                        <input type="checkbox" /> Imperishable <br />
                        <input type="checkbox" /> Dairy <br />
                        <input type="checkbox" /> Liquid <br />
                        <input type="checkbox" /> Liquid <br />
                        <input type="checkbox" /> Liquid <br />
                        <input type="checkbox" /> Dairy <br />
                        <input type="checkbox" /> Liquid <br />
                        <input type="checkbox" /> Liquid <br />
                        <input type="checkbox" /> Liquid <br />
                    </div>
                    <div className="bg-white w-30 ch-25 p-4 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Organizations</h1>
                            {/* <img className="d-flex justify-content-center m-0" src="/images/logo.png" height="50px" /> */}
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
                    <div className="bg-white w-30 ch-25 p-4 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Roles</h1>
                            <div>
                                <input type="checkbox" /> Manager
                            </div>
                            <div>
                                <input type="checkbox" /> Volunteers
                            </div>
                            <div>
                                <input type="checkbox" /> Supervisor
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className='w-25 justify-content-center d-flex btn text-white bg-dark m-2' onClick={() => {displayData();}}>Generate data</div>
                    <div className='w-25 justify-content-center d-flex btn text-white bg-dark m-2' onClick={() => {submitData();}}>Share data</div>
                </div> */}
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="bg-white w-100 p-4 rounded-4">
                        <div>
                            <h1 className="fw-bold fs-4">Generated graphs</h1>
                            <p className="">Generate graphs here from tracker</p>
                            <img src="/images/sample_graph.png" height="200px" />
                        </div>
                    </div>
                    {/* <div className="bg-white w-75 p-4 m-3 rounded-4">
                        <div className="org-logo"></div>
                        <div>
                            <h1 className="fw-bold fs-4">Discussion board</h1>
                            <p className="">Jane: Hello</p>
                            <p className="">John: Hello</p>
                        </div>
                    </div> */}

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
