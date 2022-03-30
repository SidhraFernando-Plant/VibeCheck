const USERS_KEY = "users";
const USER_KEY = "user";
const EMAIL_KEY = "email";
const DATE_KEY = "dateJoined";
const POST_TEXT_KEY = "text";
const POST_ID_KEY = "postId";
const POSTS_KEY = "posts";
const DEFAULT_AVATAR_PATH = "../img/avatar.svg";

// Params: newPost (string), username (string), postDate (string)  | Return: none
// create a post object with the params and add it to the array of post objects in local storage
function createPost(newPost, username, postDate) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var newId = parseInt(localStorage.getItem(POST_ID_KEY));
    var thisPost = {post : newPost, user: username, date: postDate, id: newId, replies:[]};
    posts.unshift(thisPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
    localStorage.setItem(POST_ID_KEY, newId+1);
  }
  
  // Params: none | Return: posts (array of post Objects)
  // get all posts from local storage
  function getPosts() {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    if(posts.length==0) {
      return null;
    }
    return posts;
  }
  
  // Params: user (string) | Return: filteredPosts (array of post Objects)
  // get all posts by the user with username user
  function getPostsByUser(user) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    if(posts.length==0) {
      return null;
    }
    var filteredPosts = [];
    for(const post of posts) {
      //alert(post.USER_KEY);
      if(user===post.user) {
          
          filteredPosts.push(post);
      }
    }
    return filteredPosts;
  }
  
  // Params: postId (int) | Return: post (Object of type post)
  // get a post with id postId
  function getPostById(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(const post of posts) {
      if(postId===post.id) {
          return post;
      }
    }
  }
  
  // Params: postId (int) | Return: none
  // remove the post with id postId from localStorage
  function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(var i=0;i<posts.length;i++) {
      if(postId===posts[i].id) {
          posts.splice(i, 1);
          localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
          return;
      }
    }
  }
  
  // Params: username (str) | Return: none
  // remove all posts and replies fromm local storage by user with supplied username
  function deletePostsByUser(username) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var updatedPosts = [];
    for(const post of posts) {
      if(username!==post.user) {
        var replies = post.replies;
        var newReplies = [];
        for(const reply of replies) {
          if(username!=reply.user) {
            newReplies.push(reply);
          }
        }
        post.replies = newReplies;
        updatedPosts.push(post);
      }
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  }
  
  // Params: newUsername (str), oldUsername (str) | Return: none
  // called when a user changes their username
  // edit all posts and replies by user with oldUsername, update username of each post to newUsername
  function updatePostsByUser(oldUsername, newUsername) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    for(const post of posts) {
      if(oldUsername==post.user) {
          post.user = newUsername;
      }
      var replies = post.replies;
      for(const reply of replies) {
        if(oldUsername==reply.user) {
          reply.user = newUsername;
        }
      }
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
  
  // Params: postId (int), newText (str) | Return: none
  // update the replyText to newText of the post with the supplied id 
  function editPost(postId, newText) {
      const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
      for(const post of posts) {
        if(postId===post.id) {
            post.post=newText;
            localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
            return;
        }
      }
  }
  
  // Params: newReply (str), username (str), replyDate (str), postId (int) | Return: none
  // add a reply to the post with id postId
  function createReply(newReply, username, replyDate, postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var repliedPost;
    for(const post of posts) {
      if(parseInt(postId)==parseInt(post.id)) {
          //var replies = post.replies;
          var thisReply = {replyText : newReply, user: username, date: replyDate};
          post.replies.unshift(thisReply);
          localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
          return;
      }
    }
  }
  
  // Params: postId (int) | Return: replies (array of reply Objects)
  // get all replies to the post with id postId
  function getReplies(postId) {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    var repliedPost;
    for(const post of posts) {
      if(postId===post.id) {
          //var replies = post.replies;
          return post.replies;
      }
    }
  }

  export {
    createPost,
    getPosts,
    getPostsByUser,
    deletePost,
    editPost,
    getReplies,
    createReply,
    getPostById,
    deletePostsByUser,
    updatePostsByUser,
}