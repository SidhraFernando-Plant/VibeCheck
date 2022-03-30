// 
//CRUD methods for Reply database to be accessed with API endpoints
// 
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Reply = db.replies;
const Op = db.Sequelize.Op;

//Create a new Reply in the db
exports.createReply = (req, res) => {
      //Use values sent in request body for the new reply
      const reply = {
          text: req.body.text,
          date: req.body.date,
          postPostId: req.body.postId,
          userUsername: req.body.username,
          img: req.body.img
      }
      return Reply.create(reply)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Reply."
            });
        });
};