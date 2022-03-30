//Define schema for Like table
//Like table contains all likes and dislikes (reactions) for all posts
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    //Type can take one of two string values: 'like' or 'dislike'
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    }},
    {
        indexes: [{
            //Composite unique identifier allowing users to react to a post/reply only once
            //Comprised of the foreign keys
            unique: true,
            fields: ['postPostId', 'userUsername', 'replyReplyId']
        }]
    });
    return Like;
  };