// 
//CRUD methods for User database to be accessed with API endpoints
// 
const argon2 = require("argon2");
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
  // Use values sent in request body for the new user
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    avatar: req.body.avatar
  };
  user.password = await argon2.hash(user.password, {type: argon2.argon2id});
  // Save the user in the database
  User.create(user)
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

// Authenticate a user's credentials
exports.authenticate = (req, res) => {
  // Validate creds sent in request body
  const creds = {
    username: req.body.username,
    password: req.body.password
  };
  // Selecet users credentials from db
  User.findByPk(
    creds.username,
    {attributes: ['username', 'password']})
    .then(data => {
      // Verify hash
      argon2.verify(data.dataValues.password, creds.password)
      .then((correct) => {
        // If hash verified and username correct, authenticate successfully
        if(data.dataValues.username===creds.username&&correct) {
          res.send(true);
        }
        else {
          res.send(false);
        }
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error authenticating User with id=" + id
      });
  });
  
};

// Create and Save new Posts
exports.createPost = (req, res) => {
    // Use values sent in request body for the new post
    const post = {
        text: req.body.text,
        date: req.body.date,
        userUsername: req.body.username, 
        img: req.body.img
    }
    //Add the new post to the Post database
    return Post.create(post)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Post."
          });
      });
  };


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Get the posts for a given user
exports.postsByUser = (req, res) => {
    username = req.params.username;
    //Find all posts for user with username given in request body
    return User.findByPk(username, { include: ["posts", "replies", "likes"] })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the posts"
          });
      });
};

// Get the posts for a given post id
exports.findPostById = (req, res) => {
  console.log("post by id");
    id = req.body.postId;
    return Post.findByPk(id, { include: ["user"] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while getting the post"
            });      
        });
  };

// Find the user with username given in the request params
exports.findOne = (req, res) => {
  console.log("user by id");
  const id = req.params.username;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving User with id=" + id
      });
    });
};

// Find a single User credentials with an id
exports.findOneCreds = (req, res) => {
  console.log("user by id");
  const id = req.params.username;

  User.findByPk(
    id,
    {attributes: ['username', 'password']})
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving User with id=" + id
      });
    });
};

// Update the user with the username given in the request params
exports.update = (req, res) => {
  const id = req.params.username;

  //The updated user is the body of the request
  User.update(req.body, {
    where: { username: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with username=" + id
      });
    });
};

// Delete a User with the username given in the request params
exports.delete = (req, res) => {
  const username = req.params.username;
  User.destroy({
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with username=${username}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with username=" + username
      });
    });
};

async function hashPass(pass) {
  var hash = await argon2.hash(pass, {type: argon2.argon2id});
  return hash;
}

// find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
