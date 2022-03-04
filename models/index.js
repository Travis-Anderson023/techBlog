const User = require('./users');
const Post = require('./posts');
const Comment = require('./comments');

//user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {
    User,
    Post,
    Comment
};
