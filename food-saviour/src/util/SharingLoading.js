import React, {useEffect, useState} from "react";
import LoadingComponent from "./Loading";
import Sharing from "../pages/Sharing";
import axiosInstance from "../axios";

const SharingLoading = () => {
    const Loading = LoadingComponent(Sharing);
    const [waste, setWaste] = useState({
        loading: false,
        WasteData: null
    });

    const [org, setOrg] = useState({
        loading: false,
        OrgData: null
    });

    const [role, setRole] = useState({
        loading: false,
        RoleData: null
    });

    useEffect(() => {
        axiosInstance.get('wasteType/').then((res) => {
            const data = res.data;
            setWaste({loading: false, WasteData: data});
        });
    }, [setWaste]);

    useEffect(() => {
        axiosInstance.get('orgName/').then((res) => {
            const data = res.data;
            setOrg({loading: false, OrgData: data});
        });
    }, [setOrg]);

    useEffect(() => {
        axiosInstance.get('roleName/').then((res) => {
            const data = res.data;
            setRole({loading: false, RoleData: data});
        });
    }, [setRole]);

    return(
        <div>
            <Loading isLoading={waste.loading && org.loading && role.loading}
                     WasteData={waste.WasteData} OrgData={org.OrgData} RoleData={role.RoleData}/>
        </div>
    );
}

export default SharingLoading;