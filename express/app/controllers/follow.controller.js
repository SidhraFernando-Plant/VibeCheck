// 
//CRUD methods for Follow database to be accessed with API endpoints
// 
const db = require("../models");
const User = db.users;
const Follow = db.follows;
const Op = db.Sequelize.Op;

// Add a new follow to the database
exports.create = (req, res) => {
  console.log("new like");
  const follow = {
    //follower: username of user who wants to follow someone
    follower: req.body.follower,
    //following: username of user to be followed
    following: req.body.following
  };
  // Save follow in the database
  Follow.create(follow)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the follow."
      });
    });
};

//Find all followers of a particular user
exports.findFollowers = (req, res) => {
    const username = req.params.username;
    Follow.findAll({
        where: { 
            //Include entries where supplied user is being followed
            following: username
        }, 
        //Include all user details for each follower from User db
        //User 2 is foreign key for follower user
        include: ["user1"] 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting followers."
          });
    });
};

//Find all users that a particular user is following
exports.findFollowing = (req, res) => {
    const username = req.params.username;
    Follow.findAll({
        where: { 
            //Include entries where supplied user is following someone else
            follower: username
        }, 
        //Include all user details for each user being followed from User db
        //User 2 is foreign key for following user
        include: ["user2"] 
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the followers"
          });
    });
};

//Check whether a particular user is following another user
exports.userIsFollowing = (req, res) => {
    const follower = req.body.follower;
    const following = req.body.following;
    //Check whether the user 'follower' is following the user 'following'
    Follow.findAll({
        where: {
            [Op.and]: [
              { follower: follower },
              { following: following }
            ]
          }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while checking the following status."
          });
    });
};

//Delete a follow
exports.delete = (req, res) => {
    console.log("delete follow");
    const follower = req.body.follower;
    const following = req.body.following;

  //delete follow where the user 'follower' is following the user 'following'
  Follow.destroy({
    where: {
        [Op.and]: [
          { follower: follower },
          { following: following }
        ]
      }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The follow was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete follow requested - maybe it does not exist`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Follow with id=" + follower + following
      });
    });
};