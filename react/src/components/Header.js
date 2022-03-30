import React from "react";
import logo from '../img/ticks.svg'
import { getAvatar } from "../data/userRepository";
import avatar from '../img/account.svg'

// props: username (str), logoutUser (function)
//Header for all pages, dynamic based on whether user is logged in (navigation options change)
function Header(props) {
    var profilePath = "/profile/" + props.username;
    return (
      <div className="d-flex justify-content-between align-items-center p-3 bg-grey header">
          <a className="ml-3 text-decoration-none" href="/">
            <div className="d-flex">
              <img src={logo} className="logo-img"></img>
              <span className="ml-3 font-weight-bold logo gradient-text">VibeCheck</span>
            </div>
          </a>
          <div>
            {props.username === null
                ?
                  <a href="/login" class="btn btn-1">Log in</a>
                :
                <>
                  
                  <a href="/posts/false" className="mr-2">Forum</a>
                  <a href={profilePath}><img src={avatar} className="logo-img mr-2 rounded-circle border border-light"></img></a>
                  <a href="/"><button type="button" class="btn btn-1" onClick={props.logoutUser}>Log out</button></a>
                </>
              }
          </div>
      </div>
    );
  }
  
export default Header;