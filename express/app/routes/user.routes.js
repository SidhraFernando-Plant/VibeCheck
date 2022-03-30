//
//Define API endpoints for User controller methods
//
module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/new-user", users.create);

    // Autthenticate user credentials
    router.post("/authenticate", users.authenticate);

    // Create a new Post
    router.post("/new-post", users.createPost);
  
    // Retrieve all Users
    router.get("/get-users", users.findAll);

    // Retrieve all Posts for a user
    router.get("/posts-by-user/:username", users.postsByUser);
  
    // Retrieve a single Post with postId
    router.get("/post-by-id", users.findPostById);
    
    // Retrieve a single User with username
    router.get("/get-user/:username", users.findOne);

    router.get("/get-user-creds/:username", users.findOneCreds);
  
    // Update a User with username
    router.put("/update/:username", users.update);
  
    // Delete a User with username
    router.delete("/delete/:username", users.delete);
    
    // Define the general path used for each endpoint 
    app.use('/api/users', router);
  };
  