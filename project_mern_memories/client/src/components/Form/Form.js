import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { addEvent, updateEvent } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', eventName: '', location: '', description: '', eventDate: '' , img: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', eventName: '', location: '', description: '', eventDate: '' , img: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(addEvent(postData));
      clear();
    } else {
      dispatch(updateEvent(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Display Name" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Event Name" fullWidth value={postData.eventName} onChange={(e) => setPostData({ ...postData, eventName: e.target.value })} />
        <TextField name="title" variant="outlined" label="Location" fullWidth value={postData.location} onChange={(e) => setPostData({ ...postData, location: e.target.value })} />
        <TextField name="title" variant="outlined" label="Date" fullWidth value={postData.eventDate} onChange={(e) => setPostData({ ...postData, eventDate: e.target.value })} />
        <TextField name="message" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Image URL" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, img: base64 })} /></div> */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
