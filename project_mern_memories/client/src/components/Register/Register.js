import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import Login from '../Login/Login'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Register(props) {
    const [disabled, cDisabled] = useState(false)
    const [loginReady, cLoginReady] = useState(false)
    const classes = useStyles()
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

    const submitHandler = (e) => {
        console.log("submit")
        e.preventDefault();
        cDisabled(true)
        props.client
        .register(e.target.displayName.value, e.target.userName.value, e.target.password.value)
        .then(() => {
            cDisabled(true)
            cLoginReady(true)
            toastr["success"]("You have created a new account. Now you can login.", "Registered!")         
        })
        .catch(() => {
            toastr["error"]("Please check that your details are in the valid format.", "Failed to register")
            cDisabled(false)
        })
    }

    
    

    return (
        <> { !loginReady ? 
        <Paper className={classes.paper}>
            <form disabled={disabled} autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler}>
                <Typography variant="h5">register an account</Typography>
                <TextField name="displayName" label="Display Name" variant="outlined" disabled={disabled} fullWidth></TextField>
                <TextField name="userName" label="Username" variant="outlined" disabled={disabled} fullWidth></TextField>
                <TextField type="password" name="password" label="Password" variant="outlined" disabled={disabled}fullWidth></TextField>
                <Button className={classes.buttonSubmit} variant="contained" disabled={disabled} color="primary" size="medium" type="submit" fullWidth>Register</Button>
            </form>
        </Paper> : <Login client={props.client} loggedIn={props.loggedIn}/>}      
        </>
    )
}

export default Register