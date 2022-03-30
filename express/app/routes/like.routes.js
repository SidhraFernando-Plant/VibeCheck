//
//Define API endpoints for Like controller methods
//
module.exports = app => {
    const likes = require("../controllers/like.controller.js");
  
    var router = require("express").Router();
  
    // Create a new like or dislike
    router.post("/new-react", likes.create);

    // Get all likes or dislikes for a post
    // It is a POST method as request body is used to send the type desired and post id
    router.post("/react-by-type", likes.findByType);

    // Create a new like or dislike
    router.delete("/delete-react", likes.delete);

    // Define the general path used for each endpoint
    app.use('/api/likes', router);
  };