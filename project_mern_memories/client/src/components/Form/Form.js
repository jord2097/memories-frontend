import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'



const Form = (props) => {
  const [disabled, cDisabled] = useState(false)  
  const classes = useStyles();
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

  const clear = () => {
    props.cCurrent(undefined)
  };

  const submitHandler = (e) => {
    e.preventDefault();
    cDisabled(true)
    let result
    if (props.current) {
      result = props.client.updateEvent (
        props.current._id,
        e.target.creator.value,
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.eventDate.value,
        e.target.img.value
      )
    } else {
      result = props.client.addEvent(
        e.target.creator.value,
        e.target.eventName.value,
        e.target.location.value,
        e.target.description.value,
        e.target.eventDate.value,
        e.target.img.value)
    }
    result
      .then(() => {
        cDisabled(false)
        document.getElementById("addForm").reset()
        if (props.current) {
          toastr["success"]("You have successfully edited the post!", "Post edited!")
        } else {
          toastr["success"]("Your new post has been successfully added to the feed!", "New post added!")
        }        
        props.refreshList()
      })
      .catch(() => {
        toastr["error"]("Your new post could not be added. Please check the fields are in the correct format.", "Failed to add post.")
        cDisabled(false)
      })

  } 

  return (
    <Paper className={classes.paper}>
      <form id="addForm" autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => submitHandler(e)}>
        <Typography variant="h6">{props.current ? `Editing "${props.current.eventName}"` : 'Creating a Memory'}</Typography>        
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="creator" label="Display Name" type="text" disabled={disabled} defaultValue={props.current?.creator}></TextField>
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="eventName" label="Event Name" type="text" disabled={disabled} defaultValue={props.current?.eventName}></TextField>
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="location" label="Location" type="text" disabled={disabled} defaultValue={props.current?.location}></TextField>
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="description" label="Description" type="text" disabled={disabled} defaultValue={props.current?.description}></TextField>
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="eventDate" label="Date" type="text" disabled={disabled} defaultValue={props.current?.eventDate}></TextField>
        <TextField key={`${Math.floor((Math.random() * 1000))}-min`} variant="outlined" fullWidth name="img" label="Image URL" type="text" disabled={disabled} defaultValue={props.current?.img}></TextField>        
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
