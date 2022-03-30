// 
//CRUD methods for Post database to be accessed with API endpoints
// 
const db = require("../models");
const Post = db.posts;

// Retrieve all Posts from the database
exports.findAll = (req, res) => {
    //Get all posts including their replies and likes
    Post.findAll({ 
      include: ["replies", "likes"],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    });
};

// Find all posts by a user with username specified in request params
exports.findByUser = (req, res) => {
  const username = req.params.username;
  //Get all posts including their replies and likes
  Post.findAll({
    where: { 
        //Include entries where supplied user is author
        userUsername: username
    }, 
    //Include replies and likes for each post
    include: ["likes", "replies"],
    order: [
      ['createdAt', 'DESC']
    ]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Posts."
    });
  });
};

//Get all replies for a post with the ID given in request params
exports.findReplyById = (req, res) => {
    const postId = req.params.id;
    return Post.findByPk(postId, { include: ["replies"] })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the replies"
          });
      });
};

// Update the post with the ID given in the request params
exports.update = (req, res) => {
  const id = req.params.id;
  //The updated post is the body of the request
  Post.update(req.body, {
    where: { postId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    });
};

// Delete the post with the ID given in the request params
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { postId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};
