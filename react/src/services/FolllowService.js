//
// Service to send API requests for Follow table
//
import httpCommon from "../http-common";

// Create a new follow
// data = {follower: username(str), following: username(str)}
const createFollow = (data) => {
    return httpCommon.post("/follows/new-follow", data);
}

// Find all users following a user
// username = str - username of  user to find followers of
const getFollowers = (username) => {
    return httpCommon.get("/follows/followers/" + username);
}

// Find all users a user is following
// username = str - find users that user with this username is following
const getFollowing = (username) => {
    return httpCommon.get("/follows/following/" + username);
}

// Find whether one user is following another]
// data = {follower: username(str), following: username(str)}
// Is 'follower' following 'following'?
const isFollowing = (data) => {
    return httpCommon.post("/follows/isFollowing", data);
}

// Delete a follow ie. a user is unfollowing another user
// data = {follower: username(str), following: username(str)}
// 'follower' is unfollowing 'following'
const deleteFollow = (data) => {
    console.log(data);
    // return httpCommon.delete("/follows/delete", data);
    return httpCommon.delete("/follows/delete", { data: data, headers: {} });
}


export default {
    createFollow,
    getFollowers,
    getFollowing,
    isFollowing,
    deleteFollow
}