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

//props: username (str - current user), profileUser (str - user displaying), editProfile (func), deleteProfile (func)
//Header of profile abstracted out to trim MyProfile.js component
export default function ProfileHeader(props) {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center profile-title">
        <h2 className="m-0 mr-2">{props.profileUser}'s profile</h2>
        {/* Allow editing if viewing own profile */}
        {props.username === props.profileUser && (
          <React.Fragment>
            <img
              src={edit}
              className="profile-actions"
              onClick={props.editProfile}
            ></img>
            <img
              src={trash}
              className="profile-actions"
              onClick={props.deleteProfile}
            ></img>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
