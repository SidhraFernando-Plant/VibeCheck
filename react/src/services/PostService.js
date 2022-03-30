//
// Service to send API requests for Post table
//
import httpCommon from "../http-common";

// Get all posts, along with their posts and likes
// No body/params in request
const getAll = () => {
    return httpCommon.get("/posts/get-posts");
}

const getByUser = (username) => {
    return httpCommon.get("/posts/get-posts-user/" + username);
}

// Create a new post
// JSON data = {text (body of post), date, username (author of post)}
const createPost = data => {
    return httpCommon.post("/users/new-post", data)
}

// Delete the post with the given postId
const deletePost = postId => {
    return httpCommon.delete("/posts/delete/" + postId);
}

// Update the body of post with the given postId to the parameter text
const updatePostText = (postId, text) => {
    return httpCommon.put("/posts/update/" + postId, {"text":text});
}

// Update the author of the post with the given postId
const updatePostUsername = (postId, username) => {
    return httpCommon.put("/posts/update/" + postId, {"userUsername":username});
}

// Get the post with the given postId, including replies
const getPost = (postId) => {
    return httpCommon.get("/posts/get-replies/" + postId);
}


export default {
    getAll,
    createPost,
    deletePost,
    updatePostText,
    updatePostUsername,
    getPost,
    getByUser
}