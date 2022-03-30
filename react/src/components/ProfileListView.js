import React from 'react'

//props: user (User object)
//Compact overview of a user to be used in a list (eg. list of followers)
export default function ProfileListView(props) {
    function goToProfile() {
        window.location.href = "/profile/" + props.user.username;
    }
    
    return (
        <div className="p-2">
            <img className="list-avatar rounded-circle" src={`../img/${props.user.avatar}`}></img>
            <span onClick={goToProfile} className="profile-link text-dark ml-1">{props.user.username}</span>
        </div>
    )
}
