import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const AuthProtected = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('access_token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? <Outlet /> : null
            }
        </React.Fragment>
    );
}
export default AuthProtected;