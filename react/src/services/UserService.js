//
// Service to send API requests for User table
//
import httpCommon from "../http-common";

// Get all users
// No request body or params
const getAll = () => {
    return httpCommon.get("/users/get-users");
}

// Get all posts by user with given username
const postsByUser = (username) => {
    return httpCommon.get("/users/posts-by-user/" + username);
}

// Verify a user's credentials
// JSON data = {username, password}
const verifyCreds = (data) => {
    return httpCommon.post("/users/authenticate", data);
}

// Make a new user
// JSON data = {username, password, email, dateJoined, role, avatar}
const createUser = data => {
    return httpCommon.post("/users/new-user", data);
}

// Get the user with the given username
const getUser = username => {
    return httpCommon.get("/users/get-user/" + username);
}

// Update the user with the given username
// JSON data = {username, email, avatar}
const updateUser = (data, username) => {
    return httpCommon.put("/users/update/" + username, data);
}

// Delete the user with the given username
const deleteUser = username => {
    return httpCommon.delete("/users/delete/" + username);
}


export default {
    getAll,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    verifyCreds,
    postsByUser
}