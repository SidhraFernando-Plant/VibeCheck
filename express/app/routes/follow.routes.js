//
//Define API endpoints for Follow controller methods
//
module.exports = app => {
    const follows = require("../controllers/follow.controller.js");
    var router = require("express").Router();
    // Create a new follow
    router.post("/new-follow", follows.create);
    
    // Find followers for a user
    router.get("/followers/:username", follows.findFollowers);
    
    // Find which users a user is following
    router.get("/following/:username", follows.findFollowing);
    
    // Check whether one user is following another user
    // Post is used as a request body is used to send the two usernames in the request
    router.post("/isFollowing", follows.userIsFollowing);
    
    // Delete a follow
    router.delete("/delete", follows.delete);
    
    // Define the general path used for each endpoint
    app.use('/api/follows', router);
};