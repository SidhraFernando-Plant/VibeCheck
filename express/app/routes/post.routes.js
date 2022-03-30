//
//Define API endpoints for Post controller methods
//
module.exports = app => {
    const posts = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Posts from the database
    router.get("/get-posts", posts.findAll);

    // Retrieve all Replies for a post
    router.get("/get-replies/:id", posts.findReplyById);

    // Retrieve all posts by the user with username
    router.get("/get-posts-user/:username", posts.findByUser);
  
    // Update a Post with id
    router.put("/update/:id", posts.update);
  
    // Delete a Post with id
    router.delete("/delete/:id", posts.delete);
    
    // Define the general path used for each endpoint
    app.use('/api/posts', router);
  };