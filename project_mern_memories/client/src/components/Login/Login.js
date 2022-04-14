import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import Register from '../Register/Register'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'



function Login(props) {
    const [disabled, cDisabled] = useState(false);
    const [needReg, cNeedReg] = useState(false)
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
        console.log("submit");
        e.preventDefault();
        cDisabled(true);
        props.client    
        .login(e.target.username.value, e.target.password.value)
        .then((response) => {
            cDisabled(true);
            props.loggedIn(response.data.token);
            toastr["success"]("You have logged in! Now you have permission to post, edit and delete!", "Logged in!")           
        })
        .catch(() => {
            toastr["error"]("Please check your login details, as they are not recognised.", "Failed to login")
            cDisabled(false);
        })
    }

    const renderRegister = () => {
        cNeedReg(true)
    }

    return (
        <> {!needReg ? 
        <Paper className={classes.paper}>
            <form disabled={disabled} autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={submitHandler}>
                <Typography variant="h5">login to your account</Typography>
                <TextField name="username" label="username" variant="outlined" disabled={disabled} fullWidth></TextField>
                <TextField type="password" name="password" label="password" variant="outlined" disabled={disabled}fullWidth></TextField>
                <Button className={classes.buttonSubmit} variant="contained" disabled={disabled} color="primary" size="medium" type="submit" fullWidth>Login</Button>                
            </form>
            <Typography variant="h8">
                    Don't have an account yet?
                    <br />                    
                    <Button onClick={renderRegister} className={classes.buttonSubmit} variant="contained" disabled={disabled} color="primary" size="small" fullWidth>Register</Button>
                </Typography>
        </Paper> : <Register client={props.client} loggedIn={props.loggedIn} /> }      
        </>
    )



}

export default Login