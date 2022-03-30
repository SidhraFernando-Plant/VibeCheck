import React from 'react'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import avatar from '../img/avatar.svg'
import UserDataService from "../services/UserService";
import Reactions from './Reactions';

// props: post (Object of type: post), showReplies (boolean), username (str), handleUpdate (function), handleDelete(function)
// Display a post including: user who made it, likes and dislikes, date posted, post text, 
//                          replies (toggle with showReplies), and ability to edit/delete if user viewing is author
export default function PostPreview(props) {
    const [imageName, setImageName] = useState('');
    // Make createdAt date readable
    var date = props.post.createdAt;
    const splitDate = date.split("T");
    date = splitDate[0] + " at " + splitDate[1].slice(0,5);

    useEffect(() => {
        //get the avatar for the author of the post
        UserDataService.getUser(props.post.userUsername)
        .then((response) => {
            setImageName(response.data.avatar);
        })
        .catch((e) => {

        })
    }, []);

    //link to PostInspect component and pass id of this post in the URL, used in link to reply
    var pathName = "/view-post/" + props.post.postId;
    var postText = null;
    //track whether a user is editing their post or not and change display accordingly
    const [editing, setEditing] = useState(false);
    const [showReplies, setShowReplies] = useState(props.showReplies);

    // Params: newText (string)  | Return: none
    // when input newText is entered into textarea field, update postText
    function setPostInput(newText) {
        postText = newText;
    }

    // Delete the post with parent component method
    function startDeletePost() {
        props.handleDelete(props.post.postId);
    }
    
    //Pass updated text to parent to use appropriate function to save
    function updatePost() {
        props.handleUpdate(props.post.postId, postText);
        toggleEditing();
    }
    
    // if not in editing mode, set editing to true to make post text editable, and remove link to replies while editing
    // if in editing mode, change state editing to false and change post to read-only
    function toggleEditing() {
        setEditing(!editing);
        setShowReplies(!showReplies);
    }

    // Go to user's profile when username is clicked
    function goToProfile() {
      window.location.href = "/profile/" + props.post.userUsername;
    }
      
    return (
      <div>
        <div className="card mb-2">
          <div className="card-body bg-grey rounded border-0">
            <div className="d-flex justify-content-between">
              <div class="d-flex">
                {/* assign default avatar if user has not uploaded one */}
                {imageName == '' ? (
                  <img
                    src={avatar}
                    className="post-avatar border border-light rounded-circle bg-light"
                  ></img>
                ) : (
                  <img
                    src={`../img/${imageName}`}
                    className="post-avatar border border-light rounded-circle bg-light"
                  ></img>
                )}

                <div>
                  <h5 onClick={goToProfile} className="profile-link card-title text-light gradient-text">
                    {props.post.userUsername}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {date}
                  </h6>
                </div>
              </div>
              <div>
                {/* allow editing/deleting if user is author of post */}
                {props.post.userUsername === props.username && (
                  <span>
                    <img
                      src={edit}
                      className="profile-actions"
                      onClick={toggleEditing}
                      data-target="#exampleFormControlTextarea1"
                    ></img>
                    <img
                      src={trash}
                      className="profile-actions"
                      onClick={startDeletePost}
                    ></img>
                  </span>
                )}
              </div>
            </div>

            {/* if user is in editing mode, display post as input field to allow changes */}
            {!editing ? (
              <React.Fragment>
              <p className="card-text text-light mt-2">{props.post.text}</p>
              {props.post.img!==null && props.post.img!=='0' && <img className="post-img" src={`../img/${props.post.img}`}></img>}
              </React.Fragment>
            ) : (
              <div className="mb-2">
                <textarea
                  className="form-control mt-3"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setPostInput(e.target.value)}
                >
                  {props.post.text}
                </textarea>
                <button
                  type="submit"
                  onClick={toggleEditing}
                  className="mt-3 btn btn-outline-info d-inline text-light"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  onClick={() => updatePost()}
                  className="mt-3 ml-3 btn btn-1 d-inline"
                >
                  SAVE
                </button>
              </div>
            )}
            <div>
            {!editing && 
            <Reactions username={props.username} postId={props.post.postId} replyId={null} dark={false}/>
            }
            
            {/* link to PostInspect and pass the id of this component in the URL */}
            {showReplies && (
              <Link
                className="bg-secondary rounded p-2 text-light"
                to={pathName}
              >
                <u>↪Reply &#40;{props.post.replies.length} replies&#41;</u>
              </Link>
            )}
            </div>
          </div>
        </div>
      </div>
    );
}
