import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = ({ context }) => {
    const location = useLocation(); 
    const isAuthorize = context.authenticatedUser;

    return isAuthorize ? <Outlet /> : <Navigate to='signin' state={{ from: location }} replace />
};

export default PrivateRoutes;