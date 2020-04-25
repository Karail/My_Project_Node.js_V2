const Sequelize = require('sequelize')
const sequelize = require('../db/db')


let Video = require('./video.js')(sequelize, Sequelize)
let Category = require('./category')(sequelize, Sequelize)
let Model = require('./model.js')(sequelize, Sequelize)
let Studio = require('./studio.js')(sequelize, Sequelize)
let Tag = require('./tag.js')(sequelize, Sequelize)
let Comment = require('./comment.js')(sequelize, Sequelize)
let Subscriber = require('./subscriber.js')(sequelize, Sequelize)

let VideoCategory = require('./videoCategory.js')(sequelize, Sequelize)
let VideoModel = require('./videoModel.js')(sequelize, Sequelize)
let VideoStudio = require('./videoStudio.js')(sequelize, Sequelize)
let VideoTag = require('./videoTag.js')(sequelize, Sequelize)

let LikeSubscriber = require('./likeSubscriber')(sequelize, Sequelize)
let DislikeSubscriber = require('./dislikeSubscriber')(sequelize, Sequelize)

Video.belongsToMany(Category, {
    through: VideoCategory,
    foreignKey: 'video_id'
});
Category.belongsToMany(Video, {
    through: VideoCategory,
    foreignKey: 'category_id'
});


Video.belongsToMany(Model, {
    through: VideoModel,
    foreignKey: 'video_id'
});
Model.belongsToMany(Video, {
    through: VideoModel,
    foreignKey: 'model_id'
});


Video.belongsToMany(Studio, {
    through: VideoStudio,
    foreignKey: 'video_id'
});
Studio.belongsToMany(Video, {
    through: VideoStudio,
    foreignKey: 'studio_id'
});


Video.belongsToMany(Tag, {
    through: VideoTag,
    foreignKey: 'video_id'
});
Tag.belongsToMany(Video, {
    through: VideoTag,
    foreignKey: 'tag_id'
});


Video.hasMany(Comment, {
    foreignKey: 'video_id'
})
Comment.belongsTo(Video, {
    foreignKey: 'video_id'
});


Video.belongsToMany(Subscriber, {
    through: LikeSubscriber,
    foreignKey: 'video_id'
});
Subscriber.belongsToMany(Video, {
    through: LikeSubscriber,
    foreignKey: 'subscriber_id'
});


module.exports = {
    Video,
    Model,
    Category,
    Studio,
    Tag,
    Comment,
    Subscriber,
    LikeSubscriber,
    DislikeSubscriber,
} 