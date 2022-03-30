import React from 'react'
import { useState, useEffect } from 'react';
import FolllowDataService from '../services/FolllowService';

// props: currentUsername (str, current user), profileUsername (str, this user) 
// Follow button shown when viewing another user's profile
// 'this user' refers to user whose profile is being viewed
export default function FollowButton(props) {
    // Monitor if the current user is following this user
    const [isFollowing, setFollowing] = useState(null);
    
    // All API requests concern current user following this user
    const data = {
        follower: props.currentUsername,
        following: props.profileUsername
    }
    
    //Check following status on page load to show correct button
    useEffect(() => {
        //see if current user is following this user
        FolllowDataService.isFollowing(data)
        .then((response) => {
            if(response.data.length===0) {
                setFollowing(false);
            }
            else {
                setFollowing(true);
            }
        })
        .catch((e) => {
            console.log(e)
        });
    }, []);

    // Current user follow this user
    function follow() {
        FolllowDataService.createFollow(data)
        .then((response) => {
            window.location.reload();
        })
        .catch((e) => {
            console.log(e)
        });
    }

    // Current user unfollow this user
    function unfollow() {
        FolllowDataService.deleteFollow(data)
        .then((response) => {
            window.location.reload();
        })
        .catch((e) => {
            console.log(e)
        });
    }

    // Don't load button until data fetch is complete
    if(isFollowing===null) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    // If currrent user is following this user, show unfollow button
    else if(isFollowing) {
        return (
            <div>
                <button onClick={unfollow} className="btn btn-light unfollow-btn">× Unfollow</button>
            </div>
        )
    }
    // If currrent user is nott following this user, show follow button
    else {
        return (
            <div>
                <button onClick={follow} className="btn btn-outline-light follow-btn">+ Follow</button>
            </div>
        )
    }
}
