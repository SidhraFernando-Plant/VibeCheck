//Define schema for Post table
//Post table contains all posts made
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      //Primary key
      postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      //The body of the post
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
    return Post;
  };