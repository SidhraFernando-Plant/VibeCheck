import React from 'react'
import LikeDataService from "../services/LikeService";
import { useState } from 'react';
import { useEffect } from 'react';
import likeLight from '../img/thumb_up_off_alt_light.svg'
import likeDark from '../img/thumb_up_off_alt_dark.svg'
import likeSelected from '../img/thumb_up_black_24dp.svg'
import dislikeLight from '../img/thumb_down_off_alt_light.svg'
import dislikeDark from '../img/thumb_down_off_alt_dark.svg'
import dislikeSelected from '../img/thumb_down_alt_black_24dp.svg'


export default function Reactions(props) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isLiked, setLiked] = useState(false);
    const [isDisliked, setDisliked] = useState(false);
    // Conditional styling: light style display for posts, dark for replies
    // This is due to the dark vs. light backgrounds for posts vs replies
    var likeDefault;
    var dislikeDefault;
    var textStyling;
    // For posts, render light buttons and text
    if(!props.dark) {
        likeDefault = likeLight;
        dislikeDefault = dislikeLight;
        textStyling = "mr-2 text-light";
    }
    // For replies, render dark buttons and text
    else {
        likeDefault = likeDark;
        dislikeDefault = dislikeDark;
        textStyling = "mr-2 text-dark";
    }
    useEffect(() => {
        //fetch likes and dislikes for post
        fetchReactions("like");
        fetchReactions("dislike");
    }, []);
    
    // Get likes or dislikes for the post and store in state
    // Params: type (string) | type='like' or 'dislike'
    function fetchReactions(type) {
        var data = {
          type: type,
          postId: props.postId,
          replyId: props.replyId
        }
        LikeDataService.getReactions(data)
        .then((response) => {
          if(type==="like") {
            setLikes(response.data.length);
            // Check whether current user has liked the post
            if(response.data.filter(filterByUser).length) {
              setLiked(true);
            }
          }
          else {
            setDislikes(response.data.length);
            // Check whether current user has disliked the post
            if(response.data.filter(filterByUser).length) {
              setDisliked(true);
            }
          }
        })
    }
    
    // Filter for array of likes/dislikes to check whether current user has liked/disliked
    function filterByUser(item) {
        if(item.userUsername === props.username) {
            return true;
        }
        return false;
    }

        // Add a like from current user to this post
    function likePost() {
        var data = {
            username: props.username,
            postId: props.postId,
            type: "like",
            replyId: props.replyId
        } 
        console.log(data);
        // Can't like if user has already liked or disliked
        if(isDisliked) {
            alert("You've already reacted to this post!");
        }
        else if(isLiked) {
            // Remove like
            LikeDataService.deleteReaction(data)
            .then((response) => {
                fetchReactions("like");
                setLiked(false);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else {
            //Save like to db
            LikeDataService.createLike(data)
            .then((response) => {
            // Reload likes
                fetchReactions("like");
            })
            .catch((e) => {
                console.log(e);                                              
            })
        }
    }
      
    // Add a dislike from current user to this post
    function dislikePost() {
        var data = {
            username: props.username,
            postId: props.postId,
            type: "dislike",
            replyId: props.replyId
        }
        // Can't dislike if user has already liked or disliked
        if(isLiked) {
            alert("You've already reacted to this post!");
        }
        else if(isDisliked) {
            // Remove dislike
            LikeDataService.deleteReaction(data)
            .then((response) => {
                console.log(response);
                fetchReactions("dislike");
                setDisliked(false);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else {
            // save dislike to db
            LikeDataService.createLike(data)
            .then((response) => {
            // Reload dislikes
                fetchReactions("dislike");
            })
            .catch((e) => {
                console.log(e);                                              
            })
        }
    }
    return (
            <span className="mr-3 mt-2 reactions">
            {/* display highlighted like button if post is liked by user */}
              {isLiked
              ?
              <img onClick={likePost} src={likeSelected} className="mr-1"></img>
              :
              <img onClick={likePost} src={likeDefault} className="mr-1"></img>
              }
              <span className={textStyling}>{likes}</span>
            {/* display highlighted dislike button if post is disliked by user */}
              {isDisliked
              ?
              <img onClick={dislikePost} src={dislikeSelected} className="mr-1"></img>
              :
              <img onClick={dislikePost} src={dislikeDefault} className="mr-1"></img>
              }
              <span className={textStyling}>{dislikes}</span>
            </span>

    )
}
