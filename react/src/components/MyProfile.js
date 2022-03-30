import avatar from '../img/avatar.svg'
import edit from '../img/edit.svg'
import trash from '../img/delete.svg'
import {deleteUser, editUser, setUser, getAvatar, setAvatar, userExists} from "../data/userRepository";
import {deletePostsByUser, updatePostsByUser} from "../data/postRepository";
import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import UserDataService from "../services/UserService";
import Followers from './Followers';
import { useParams } from 'react-router';
import ProfileHeader from './ProfileHeader';
import FollowButton from './FollowButton';
import {sanitiseInput} from "../util/Sanitise"


// props: username (str), logoutUser (function), loginUser (function)
// Show a user's details and allow them to edit some details if viewing their own profile
function MyProfile(props) {
  // Username of profile being displayed
  const { usernameReq } = useParams();
  // track whether a user is editing their profile or not and change display accordingly
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmailState] = useState(false);
  const [usernameState, setUsernameState] = useState(false);
  const [date, setDate] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageName, setImageName] = useState('placeholder.png');
  
  
  useEffect(() => {
    //Secured page: only allow access if user is logged in
    if(props.username===null||props.username==="") {
      window.location.href = "/login";
    }
    // Fetch user details on pagge load to display
    else {
      UserDataService.getUser(usernameReq)
      .then(response => {
        //If the profile doesn't exist, redirect the user
        if(response.data==="") {
          alert("Whoops! That profile doesn't exist.");
          window.location.href="/";
        }
        // Update state with user info
        setEmailState(response.data.email);
        setUsernameState(response.data.username);
        var date = response.data.createdAt;
        const splitDate = date.split("T");
        date = splitDate[0];
        setDate(date);
        setAvatarUrl(response.data.avatar);
        setImageName(response.data.avatar);
      })
      .catch(e => {
        console.log(e);
      });
    }
  }, []);

  // Username of the current user is default input when changing username
  var username = props.username;
  var emailInput = email;
  
  // Params: fileName (string)  | Return: none
  // when an image is submitted, update the avatar in the database
  function saveAvatar(fileName) {
    var data = {
        "avatar": fileName
    }
    UserDataService.updateUser(data, props.username)
    .then((response) => {
        window.location.reload();
    })
    .catch((e) => {
        console.log(e);
    });
  }

  // Params: newUsername (string)  | Return: none
  // when input newUsername is entered into textarea field, update username
  function setUsernameInput(newUsername) {
      username = sanitiseInput(newUsername);
  }

  // Params: newEmail (string)  | Return: none
  // when input newEmail is entered into textarea field, update emailInput
  function setEmailInput(newEmail) {
      emailInput = sanitiseInput(newEmail);
  }
  

  // delete the current user's profile and log them out
  function deleteProfile() {
    if(window.confirm('Are you sure you want to delete your account?')) {
          // delete user in database
          UserDataService.deleteUser(props.username)
          .then(() => {
              // delete posts
              //log out user
              localStorage.removeItem("user");
              props.logoutUser();
              //Navigate back to home screen
              props.history.push("/");
          })
          .catch(e => {
              console.log(e);
          });
          
        }
    }
    
    //change state editing to true and allow user to edit their profile
    function editProfile() {
        setEditing(!editing);
    }
    
    //change state editing to false and change profile information to read-only
    function cancelEdit() {
      setEditing(false);
    }

    // Params: newUsername (string), newEmail (string)  | Return: none
    // update a user's profile in the database with information entered in input fields
    function updateProfile(newUsername, newEmail) {
      // If user hasn't changed username, only update email
      if(newUsername===props.username) {
        var user = {
          email: newEmail
        };  
      }
      else {
        var user = {
          username: newUsername,
          email: newEmail,
        }; 
        // Check whether the new username is taken
        UserDataService.getUser(newUsername)
          .then((response) => {
              //If a user exists with the new username, cancel update
              if(response.data!=="") {
                alert("Bad luck! That username is already taken");
                setEditing(false);
                return;
              }
          })
          .catch(e => {
              console.log(e);
          });
      }
      //If no users exist with the new username, profile can be updated
      // Update user in database
      UserDataService.updateUser(user, props.username)
      .then((response) => {
        // Store the new details in application
        props.loginUser(newUsername);
        setEmailState(newEmail);
        localStorage.setItem("user", newUsername);
        window.location.href = "/profile/" + newUsername;
      })
      .catch((e) => {
        console.log(e);
      });
              
    }
    
    return (
      <div  className="full-height">
      {!usernameState
      ?
      <p>Loading...</p>
      :
      <React.Fragment>
      {/* only render profile when data fetch is complete */}
      <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Upload image
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ImageUpload username={props.username} saveImage={saveAvatar}/>
              </div>
              
            </div>
          </div>
        </div>

        <ProfileHeader username={props.username} profileUser={usernameState} editProfile={editProfile} deleteProfile={deleteProfile}></ProfileHeader>
        <div className="profile-details d-flex flex-column rounded mt-3 bg-grey justify-content-start">
          <div className="d-flex align-items-center profile-header">
            <div className="d-flex flex-column">
              {/* assign default avatar if user has not uploaded one */}
              {avatarUrl == "" ? (
                <img src={avatar} className="avatar rounded-circle bg-light"></img>
              ) : (
                <img className="avatar rounded-circle m" src={`../img/${imageName}`}></img>
              )}
            </div>
            {!editing ? (
              <div className="ml-3">
                <h3 className="m-0">{usernameState}</h3>
                {props.username===usernameState
                ?
                <a
                  className="m-0 text-muted"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Update avatar
                </a>
                :
                <FollowButton currentUsername={props.username} profileUsername={usernameState}></FollowButton>
                }
              </div>
            ) : (
              <>
                <input
                  type="text"
                  defaultValue={props.username}
                  className="form-control mr-3 ml-3"
                  id="newUsername"
                  placeholder="Enter new username"
                  onChange={(e) => setUsernameInput(e.target.value)}
                ></input>
              </>
            )}
            
          </div>
          {!editing ? (
            <span className="profile-info text-light">
              Email: {email}
            </span>
          ) : (
            <>
              <input
                type="email"
                defaultValue={email}
                className="form-control mt-3 mr-3 ml-3 email-input"
                id="newEmail"
                placeholder="Enter new email"
                onChange={(e) => setEmailInput(e.target.value)}
              ></input>
            </>
          )}
          {/* user cannot edit the date that they joined, so it is not displayed in editing mode */}
          {!editing ? (
            <span className="profile-info mt-0 text-light">
              Vibing since {date}
            </span>
          ) : (
            <>
              <div className="m-auto">
                <button
                  type="submit"
                  onClick={cancelEdit}
                  className="mt-3 btn btn-outline-info d-inline text-light"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  onClick={() => updateProfile(username, emailInput)}
                  className="mt-3 ml-3 btn btn-1 d-inline"
                >
                  UPDATE
                </button>
              </div>
            </>
          )}
        </div>
        <div className="profile-details">
          <Followers username={usernameState}></Followers>
        </div>
        </React.Fragment>
      }
        
      </div>
    );
  }
export default MyProfile;