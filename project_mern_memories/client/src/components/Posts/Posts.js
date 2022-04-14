import React, { useState , useEffect } from 'react';
import { Container, Grow, AppBar, Typography, TextField, Toolbar, Button } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

const Posts = (props) => {  
  const [query, setQuery] = useState("")  
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

  const searchDate = () => {
    if (query === "") {
      props.refreshList()
    }
    console.log(query)

    props.client.getEventsByDate(query).then((response) => props.cEvents(response.data))    
  }

  const searchLocation = () => {    
    if (query === "") {
      props.refreshList()
    }
    props.client.getEventsByLocation(query).then((response) => props.cEvents(response.data))
  }

  const deleteEvent = (_id) => {
    props.client.deleteEvent(_id).then(() => {
      props.refreshList()
      toastr["info"]("You have deleted the post.", "Post deleted!")
    }
    )
  }

  const updateEvent = (_id) => {
    props.cCurrent(_id)    
  }

  return (
    <>
    <Toolbar className={classes.toolbar}>
        <TextField style={{backgroundColor: "#FFFFFF"}} fullWidth name="search" variant="outlined" label="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" onClick={() => searchDate()}>by Date</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" onClick={() => searchLocation()}>by Location</Button>
    </Toolbar>
    {!props.events.length ? (<CircularProgress />) : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {props.events.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} updateEvent={updateEvent} deleteEvent={deleteEvent} />
          </Grid>
        ))}
      </Grid>
    )}
    </>
  );
};

export default Posts;
