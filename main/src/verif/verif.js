import AdminLayout from "layouts/admin";
import React from "react";
import { Navigate } from "react-router-dom";


const Verif = (props) =>{
    const token = ""

    if (token) {
        return <AdminLayout/>
    }
    return <Navigate to={props.to} replace/>
}

export default Verif;