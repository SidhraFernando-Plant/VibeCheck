//
// Service to send API requests for Like table
//
import httpCommon from "../http-common";

// Create a new like
// JSON data = {username, postId, type}
// type is either 'like' or 'dislike'
const createLike = (data) => {
    return httpCommon.post("/likes/new-react", data);
}

// Get the likes and dislikes for the post with a specified id
// JSON data = {type, postId}
// type is either 'like' or 'dislike'
const getReactions = (data) => {
    return httpCommon.post("/likes/react-by-type", data);
}

// Delete a like/dislike with a specific user/post id
// JSON data = {type, postId, username}
// type is either 'like' or 'dislike'
const deleteReaction = (data) => {
    return httpCommon.delete("/likes/delete-react", { data: data, headers: {} });
}

export default {
    createLike,
    getReactions,
    deleteReaction
}