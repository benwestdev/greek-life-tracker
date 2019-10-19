import React from "react";
import { Alert } from 'reactstrap';

const Toast = ({type, message}) => {
    let color = 'success';
    if(type === 'error') {
        color = 'danger';
    } else if(type === 'warning') {
        color = 'warning';
    }

    return (
        <Alert color={color} >
            {message}
        </Alert>
    )
}