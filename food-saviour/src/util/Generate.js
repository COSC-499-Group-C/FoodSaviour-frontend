import React from "react";
import PieChart from "../components/PieChart";
import {MDBCard, MDBCardBody} from "mdb-react-ui-kit";

const Generate = (props) => {
    const { data } = props;

    const date = new Date();
    if (!data || data.length === 0) return;
    return(
        <div>
            <MDBCard className="mb-5">
                    <MDBCardBody>
                        <PieChart
                            data={data}
                            innerRadius={50}
                            outerRadius={100}
                        />
                        <p className="m-0 small float-end">{date.toString()}</p>
                    </MDBCardBody>
                </MDBCard>,
        </div>
    );
}

export default Generate;