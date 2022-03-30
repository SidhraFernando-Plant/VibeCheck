//
//Define API endpoints for Follow controller methods
//
module.exports = app => {
    const replies = require("../controllers/reply.controller");
  
    var router = require("express").Router();
  
    // Create a new reply
    router.post("/new-reply", replies.createReply);

    // // Retrieve all Replies for a post
    // router.get("/get-replies/:id", posts.findReplyById);
  
    // // Update a Post with id
    // router.put("/update/:id", posts.update);
  
    // // Delete a Post with id
    // router.delete("/delete/:id", posts.delete);
    // Define the general path used for each endpoint
    app.use('/api/replies', router);
  };