import React, { useState, useEffect } from 'react';
import './Post.css';
import { db } from './firebase';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



function PostMoreOptions({ postId, user, username }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (username == user?.displayName) {
      db.collection("posts").doc(postId).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    } else {
      console.log('post not created by you')
    }

  }

  return (
    <div>
      <Button className="post__Morebutton" aria-controls="simple-menu"
        aria-haspopup="true" onClick={handleClick}>
        <strong> . . . </strong>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="menu__items" onClick={handleDelete}>
          Delete
        </MenuItem>

      </Menu>
    </div>
  );
}


function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")    //fetches new posts from database 
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };

  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId)  //adds comment to the database
      .collection("comments")
      .add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    setComment('');

  };



  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerUser"><Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg" />
          <h4>{username}</h4>

        </div>
        {user && (
          <PostMoreOptions postId={postId} user={user} username={username} />
        )}
      </div>
      <div className="post__imageScroll">
        <img className="post__image" src={imageUrl}
          alt=""
        />
      </div>
      <h4 className="post__text">
        <strong>{username} </strong>
        <small>{caption}</small>
      </h4>
      {comments?.length > 0 &&
        <div className="post__comments">
          {comments.map((comment) => (
            <>
              <p className='post__comment'>
                <strong>{comment?.username || 'Anonymous'}</strong>
                <small>
                  {comment?.text}
                </small>
              </p>
            </>

          ))}

        </div>
      }

      {user && (

        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}> post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post