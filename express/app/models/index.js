//Configure the database
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Add all models as tables
db.users = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.replies = require("./reply.model.js")(sequelize, Sequelize);
db.likes = require("./like.model.js")(sequelize, Sequelize);
db.follows = require("./follow.model.js")(sequelize, Sequelize);

//Foreign key in Reply table mapping to postId in Post table
//Post has many replies, reply has one post
db.posts.hasMany(db.replies, {foreignKey: "postPostId", as: "replies", onDelete: "cascade"});
db.replies.belongsTo(db.posts, {
  foreignKey: "postPostId",
  as: "post"
});


//Foreign key in Reply table mapping to username in User table
//User has many replies, reply has one user
db.users.hasMany(db.replies, {foreignKey: "userUsername", as: "replies", onDelete: "cascade"});
db.replies.belongsTo(db.posts, {
  foreignKey: "userUsername",
  as: "user"
});


//Foreign key in Post table mapping to username in User table
//User has many posts, post has one user
db.users.hasMany(db.posts, {foreignKey: "userUsername", as: "posts", onDelete: "cascade"});
db.posts.belongsTo(db.users, {
  foreignKey: "userUsername",
  as: "user"
});

// db.users.belongsToMany(db.posts, {through: db.likes});
// db.posts.belongsToMany(db.users, {through: db.likes});

//Foreign key in Like table mapping to postId in Post table
//Post has many likes, like has one post
//A like is either tied to a replyId or postId, one FK will be null
db.posts.hasMany(db.likes, {foreignKey: "postPostId", as: "likes", onDelete: "cascade"});
db.likes.belongsTo(db.posts, {
  foreignKey: "postPostId",
  as: "post"
});

//Foreign key in Likes table mapping to username in User table
//User has many likes, like has one user
db.users.hasMany(db.likes, {foreignKey: "userUsername", as: "likes", onDelete: "cascade"});
db.likes.belongsTo(db.users, {
  foreignKey: "userUsername",
  as: "user"
});

//Foreign key in Likes table mapping to replyId in Reply table
//Reply has many likes, like has one reply
//A like is either tied to a replyId or postId, one FK will be null
db.replies.hasMany(db.likes, {foreignKey: "replyReplyId", as: "likes", onDelete: "cascade"});
db.likes.belongsTo(db.replies, {
  foreignKey: "replyReplyId",
  as: "reply"
});

//Foreign key in Follow table mapping to username in User table
//A user follows many users, and is followed by many users
//This is the foreign key for the user that is following another user
db.follows.belongsTo(db.users, {
  foreignKey: "follower",
  as: "user1",
  onDelete: "cascade"
});

//Foreign key in Follow table mapping to username in User table
//A user follows many users, and is followed by many users
//This is the foreign key for the user that is being followed by another user
db.follows.belongsTo(db.users, {
  foreignKey: "following",
  as: "user2",
  onDelete: "cascade"
});

module.exports = db;
