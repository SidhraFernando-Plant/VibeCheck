import React from 'react'
import avatar from '../img/avatar.svg'
import FollowDataService from "../services/FolllowService";
import { useEffect } from 'react';
import { useState } from 'react';
import ProfileListView from './ProfileListView';

// props: username (str)
// Shows a user's followers, and who they are following
export default function Followers(props) {
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    
    //Get followers/following on page load to display
    useEffect(() => {
        
        FollowDataService.getFollowers(props.username)
        .then((response) => {
            setFollowers(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
        
        FollowDataService.getFollowing(props.username)
        .then((response) => {
            setFollowing(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }, []);
    return (
        <div>
        {/* Only display followers/following when data fetch complete */}
        {followers===null||following===null
        ?
        <p>Loading...</p>
        :
            <div id="accordion">
                <div class="card">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <div class="card-header" id="headingOne">                   
                    <h5 class="mb-0">
                        Followers ({followers.length})                      
                    </h5>                  
                    </div>
                    </button>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div>
                    {followers.length===0
                    ?
                    <p>No followers yet.</p>
                    :
                    <React.Fragment>
                    {followers.map(function(follower){
                        {/* user1 is foreign key for follower in Follow table */}
                        return <ProfileListView user={follower.user1}></ProfileListView>;
                    })}
                    </React.Fragment>
                    }
                    </div>
                    </div>
                </div>
                <div class="card">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseOne">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            Following ({following.length})
                        </h5>
                    </div>
                </button>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div>
                    {following.length===0
                    ?
                    <p>Not following anyone yet.</p>
                    :
                    <React.Fragment>
                    {following.map(function(following){
                        {/* user2 is foreign key for following user in Follow table */}
                        return <ProfileListView user={following.user2}></ProfileListView>;
                    })}
                    </React.Fragment>
                    }
                    </div>
                    </div>
                </div>
                
            </div>
        }
        </div>
    )
}
