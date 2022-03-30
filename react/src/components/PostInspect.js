import React from 'react'
import PostPreview from './PostPreview'
import { createReply, getReplies, getPostById } from '../data/postRepository';
import { useLocation, useParams } from 'react-router-dom';
import Reply from './Reply';
import { useState, useEffect } from 'react';
import CollapsibleForm from './CollapsibleForm';
import PostDataService from "../services/PostService";
import ReplyDataService from "../services/ReplyService";


//props: username (str)
//Display a post with all of its replies, and allow user to submit a reply
export default function PostInspect(props) {
    //Retrieve the id of the post to be displayed from the URL
    const { id } = useParams();
    const [replies, setReplies] = useState(null);
    const [post, setPost] = useState(null);
    var replyText;
    
    //Secured page: only allow access if user is logged in
    useEffect(() => {
        if(props.username===null||props.username==="") {
          window.location.href = "/login";
        }
        else {
          // Get the post from db
          PostDataService.getPost(id)
          .then((response) => {
            //If the post doesn't exist, redirect the user
            if(response.data==="") {
              alert("Whoops! That post doesn't exist.");
              window.location.href="/";
            }
            setPost(response.data);
            // Get the replies from the db
            fetchReplies();
          })
          .catch((e) => {
            console.log(e);
          });
        }
    }, []);

    // Params: newText (string)  | Return: none
    // when input newText is entered into textarea field, update replyText
    function setReplyText(newText) {
        replyText = newText;
    }

    // Params: newReplyText (string)  | Return: none
    // sace a reply with text newReplyText (to the post being displayed) in the database
    function makeReply(newReplyText, imageName) {
        var today = new Date();
        today = today.toDateString();
        var reply = {
          date: today,
          text: newReplyText,
          postId: id,
          username: props.username,
          img: imageName
        }
        // Save reply in db
        ReplyDataService.newReply(reply)
        .then((response) => {
          // Reload replies
          fetchReplies();
        })
        .catch((e) => {
          console.log(e)
        });
        //clear input field
        document.getElementById("reply-input").value = "";
    }

    // Get replies to the post being shown from the db and save in state
    function fetchReplies() {
      PostDataService.getPost(id)
          .then((response) => {
            setReplies(response.data.replies);
          })
          .catch((er) => {
            console.log(er);
          });
    }
    
    //Update post
    function updatePost(postId, postText) {
      PostDataService.updatePostText(postId, postText)
      .then((response) => {
        console.log(response);
        // Reload posts
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
    }

    // Delete the post from db
    function startDeletePost(postId) {
      if(window.confirm('Are you sure you want to delete this post?')) {
        PostDataService.deletePost(postId)
        .then((response) => {
          console.log(response);
          // Reload posts
          window.location.href = "/posts/false";
        })
        .catch((e) => {
          console.log(e);
        });
        
      }
    }
    
    return (
      <div  className="full-height">
        <p className="align-body">
          <a href="/posts/false" className="text-dark">
            ← Back to forum
          </a>
        </p>
        <div className="post m-auto">
          <div className="mt-3">
            {/* Only render post once it has been fetched */}
            {
              post !== null
              ?
              <PostPreview post={post} showReplies={false} username={props.username} handleUpdate={updatePost} handleDelete={startDeletePost}/>
              :
              <p>Loading..</p>
            }
            
          </div>
        </div>
        <CollapsibleForm
          heading="Replies"
          formTitle="+ New reply"
          txtAreaLabel="Share your thoughts..."
          handleSubmit={makeReply}
        />

        <div className="post m-auto">
          {replies != null && replies.length != 0 ? (
            replies.map(function (reply) {
              return <Reply reply={reply} username={props.username}/>;
            })
          ) : (
            <>
              <p>There aren't any replies yet... be the first!</p>
            </>
          )}
        </div>
      </div>
    );
}
