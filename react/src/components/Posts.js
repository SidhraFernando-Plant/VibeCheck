import {getAvatar} from "../data/userRepository"
import {createPost, getPosts, getPostsByUser, deletePost, editPost} from "../data/postRepository"
import PostPreview from './PostPreview'
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CollapsibleForm from "./CollapsibleForm";
import UserDataService from "../services/UserService";
import PostDataService from "../services/PostService";
import LikeDataService from "../services/LikeService";


//props: username (str), 
//Show all posts in ascending chronological order to user
function Posts(props) {
    // Is the user viewing the page with all posts or just their posts?
    const { isUserPosts } = useParams();
    var postText = null;
    var postsVar = [];
    const [posts, setPosts] = useState(null);

    //Secured page: only allow access if user is logged in
    useEffect(() => {
      if(props.username===null||props.username==="") {
        window.location.href = "/login";
      }
      else {
        // Fetch posts on page load
        
        console.log(isUserPosts);
        if(isUserPosts==="true") {
          fetchUserPosts();
        }
        else {
          fetchPosts();
        }
      }
    }, []);

    function fetchPosts() {
      PostDataService.getAll()
        .then((response) => {
          console.log(response);
          setPosts(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
    }

    function fetchUserPosts() {
      PostDataService.getByUser(props.username)
        .then((response) => {
          console.log(response);
          setPosts(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
    }

    // Params: textPost (string)  | Return: none
    // save a new post with text textPost in db, update state and clear  input field for new post
    function makePost(textPost, imageName) {
      var post = {
        text: textPost,
        date: "2/10/2021",
        username: props.username,
        img: imageName
      }
      // Save post in db
      PostDataService.createPost(post)
      .then((response) => {
        console.log(response);
        document.getElementById("reply-input").value = "";
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
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
        
      }
    }

    //Save edits made to post by saving postText as the new text for the post in db
    function updatePost(postId, postText) {
      PostDataService.updatePostText(postId, postText)
      .then((response) => {
        console.log(response);
        // Reload posts
        fetchPosts();
      })
      .catch((e) => {
        console.log(e);
      });
    }

    //Toggle from viewing all posts to only current user's posts
    function togglePosts() {
      //if currently viewing user posts, navigate to all posts page
      if(isUserPosts==="true") {
        window.location.href="/posts/false"
      }
      //otherise, navigate to user posts page
      else {
        window.location.href="/posts/true"
      }
    }

    return (
      <div  className="full-height">
        <CollapsibleForm heading="Forum" formTitle="+ New post" txtAreaLabel="Share your thoughts..." handleSubmit={makePost}/>
        <div className="form-check card-new-post mb-3">
        {isUserPosts==="true"
        ?
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={togglePosts} checked="true"></input>
        :
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={togglePosts} ></input>
        }
          
          <label className="form-check-label" for="defaultCheck1">
            Show only my posts
          </label>
        </div>
          {posts !== null && posts.length!==0
          ?
          <div className="d-flex">
            <div className="posts m-auto">
              
              {posts.map(function(post){
                return <PostPreview post={post} username={props.username} showReplies={true} avatarUrl="" handleDelete={startDeletePost} handleUpdate={updatePost}/>;
              })}
            </div>
            </div>
          :
          <p className="posts m-auto">{isUserPosts ? "You haven't made any posts yet." : "No posts have been made yet."}</p>
          }
          </div>
    );
  }
  
export default Posts;