import React from 'react'
import { getAvatar } from '../data/userRepository';
import avatar from '../img/avatar.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import UserDataService from '../services/UserService';
import Reactions from './Reactions';

//props: reply (Object of type: reply) 
//Display a reply including user who made it, date posted, reply text
export default function Reply(props) {
    const [imageName, setImageName] = useState('');
    // Make createdAt date readable
    var date = props.reply.createdAt;
    const splitDate = date.split("T");
    date = splitDate[0] + " at " + splitDate[1].slice(0,5);
    //Fetch reply info from db on page load to display
    useEffect(() => {
        UserDataService.getUser(props.reply.userUsername)
        .then((response) => {
            setImageName(response.data.avatar);
        })
        .catch((e) => { 
            console.log(e);
        })
        
    }, []);
    
    // Go to user's profile when username is clicked
    function goToProfile() {
        window.location.href = "/profile/" + props.reply.userUsername;
    }

    return (
        <div>
            <li className="list-group-item d-flex justify-content-start align-items-start">

                <img src={`../img/${imageName}`} className="post-avatar rounded-circle mt-1"></img>
                <div className="ms-2">
                    <h4 onClick={goToProfile} className="m-0 profile-link">{props.reply.userUsername}</h4>
                    <span className="d-block mb-1 mt-2">{props.reply.text}</span>
                    {props.reply.img!==null && props.reply.img!=='0' && <img className="post-img mb-1" src={`../img/${props.reply.img}`}></img>}
                    <div>
                        <Reactions username={props.username} postId={null} replyId={props.reply.replyId} dark={true}/>
                        <span className="text-black-50">{date}</span>
                    </div>
                </div>
                
            </li>
            
        </div>
    )
}
