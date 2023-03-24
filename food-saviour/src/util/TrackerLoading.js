import React, { useState, useEffect } from "react";
import Tracker from "../pages/Tracker";
import LoadingComponent from "./Loading";
import axiosInstance from "../axios";

const TrackerLoading = () => {
    const Loading = LoadingComponent(Tracker);

    const [waste, setWaste] = useState({
        loading: false,
        WasteData: null
    });

    useEffect(() => {
        axiosInstance.get('wasteType/').then((res) => {
            const data = res.data;
            setWaste({loading: false, WasteData: data});
        });
    }, [setWaste]);

    return (
        <div>
            <Loading isLoading={waste.loading} WasteData={waste.WasteData} />
        </div>
    );
}

export default TrackerLoading;