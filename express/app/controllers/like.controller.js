// 
//CRUD methods for Like database to be accessed with API endpoints
// 
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Like = db.likes;
const Op = db.Sequelize.Op;

// Create and Save a new Like
exports.create = (req, res) => {
  // console.log()
  const like = {
    userUsername: req.body.username,
    postPostId: req.body.postId,
    replyReplyId: req.body.replyId,
    type: req.body.type
  };
  // Save Tutorial in the database
  Like.create(like)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Like."
      });
    });
};

exports.findByType = (req, res) => {
    console.log("find reactions");
    const postId = req.body.postId;
    const replyId = req.body.replyId;
    const reactType = req.body.type;
    console.log(req.body);
    console.log(reactType);

  Like.findAll({
    where: { postPostId: postId,
             replyReplyId: replyId,
             type: reactType
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
    });
};

//Delete a like or dislike
exports.delete = (req, res) => {
  const postId = req.body.postId;
  const replyId = req.body.replyId;
  const username = req.body.username;
  const reactType = req.body.type;
  Like.destroy({
  where: {
      [Op.and]: [
        { userUsername: username },
        { postPostId: postId },
        { replyReplyId : replyId },
        { type: reactType}
      ]
    }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "The" + reactType + " was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete like requested - maybe it does not exist`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Like"
    });
  });
};

