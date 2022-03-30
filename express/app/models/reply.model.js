//Define schema for Reply table
//Reply table contains all replies between users
module.exports = (sequelize, Sequelize) => {
    const Reply = sequelize.define("reply", {
      //Primary key
      replyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      //Body of reply
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  
    return Reply;
};