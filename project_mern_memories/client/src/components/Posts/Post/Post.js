import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStyles from './styles';


const Post = (props) => {  
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={props.post.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={props.post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{props.post.creator}</Typography>
        <Typography variant="body2">{props.post.eventDate}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => props.updateEvent(props.post)}><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{props.post.location}</Typography>
      </div> 
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{props.post.eventName}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{props.post.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" onClick={() => dispatch(likePost(props.post._id))}><ThumbUpAltIcon fontSize="small" /> Like {props.post.likeCount} </Button> */}
        <Button size="small" color="primary" onClick={() => props.deleteEvent(props.post._id)}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
