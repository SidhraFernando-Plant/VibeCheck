//Define schema for Follow table
//Follow table contains all follows between users
const User = require("./user.model.js");
module.exports = (sequelize, Sequelize) => {
    const Follow = sequelize.define("follow", {
    //ID is the only column as follows are stored as two foreign keys to the User table
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }},
    {
        indexes: [{
            //Composite unique identifier to allow a user to follow another once only
            //Comprised of the foreign keys
            unique: true,
            fields: ['follower', 'following']
        }]
    }
    );
    return Follow;
  };