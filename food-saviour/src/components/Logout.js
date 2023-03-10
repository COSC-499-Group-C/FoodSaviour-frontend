import React, { useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance.post("logout/blacklist/", {
			refresh_token: localStorage.getItem("refresh_token"),
		});
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("currUserId");
		axiosInstance.defaults.headers["Authorization"] = null;
        console.log("done");
		navigate("/login");
	});
	return <div>Logout</div>;
}