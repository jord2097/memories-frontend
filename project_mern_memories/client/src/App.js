import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, Typography, TextField, Toolbar, Button } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Login from './components/Login/Login'
import useStyles from './styles';
import { ApiClient } from './api/index';
import memories from './images/memories.png'

const App = () => {
  const [events, cEvents] = useState([])
  const [current, cCurrent] = useState(undefined)
  const [token, changeToken] = useState(window.localStorage.getItem("token"))
  const classes = useStyles(); 

  const loggedIn = (newToken, userName) => {
    window.localStorage.setItem("token", newToken)
    changeToken(newToken)
    
  }

  const logout = () => {
    window.localStorage.setItem("token", "")
    changeToken("")
  }

  const client = new ApiClient(
    token,
    logout
  )

  const refreshList = () => {
    client.getEvents().then((response) => cEvents(response.data))
  }

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography className={classes.heading} variant="h2" align="center">Memories App</Typography>
            <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>       
      </AppBar>      
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts client={client} refreshList={refreshList} events={events} cEvents={cEvents} current={current} cCurrent={cCurrent} />
            </Grid>
            <Grid item xs={12} sm={4}>
            {token ? (
              <Form client={client} refreshList={() => {
                refreshList();
                cCurrent(undefined)
              }}
              current={current}
              cCurrent={cCurrent}/>

            ) : (
              <Login loggedIn={loggedIn} client={client} />
            )  
            }
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
