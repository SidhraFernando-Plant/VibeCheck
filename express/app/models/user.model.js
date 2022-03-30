//Define schema for User table
//Follow table contains details of all VibeCheck users
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    //Primary key, usernames must be unique
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    //stored as a file name
    avatar: {
      type: Sequelize.STRING
    }
  });

  return User;
};
