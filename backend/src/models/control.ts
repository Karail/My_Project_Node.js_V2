const Sequelize = require('sequelize')
import sequelize from '../../db/db';


let VideoM = require('./video.js')(sequelize, Sequelize);
let CategoryM = require('./category')(sequelize, Sequelize);
let ModelM = require('./model.js')(sequelize, Sequelize);
let StudioM = require('./studio.js')(sequelize, Sequelize);
let TagM = require('./tag.js')(sequelize, Sequelize);
let CommentM = require('./comment.js')(sequelize, Sequelize);
let SubscriberM = require('./subscriber.js')(sequelize, Sequelize);

let VideoCategoryM = require('./videoCategory.js')(sequelize, Sequelize);
let VideoModelM = require('./videoModel.js')(sequelize, Sequelize);
let VideoStudioM = require('./videoStudio.js')(sequelize, Sequelize);
let VideoTagM = require('./videoTag.js')(sequelize, Sequelize);

let LikeSubscriberM = require('./likeSubscriber')(sequelize, Sequelize);
let DislikeSubscriberM = require('./dislikeSubscriber')(sequelize, Sequelize);

VideoM.belongsToMany(CategoryM, {
    through: VideoCategoryM,
    foreignKey: 'video_id'
});
CategoryM.belongsToMany(VideoM, {
    through: VideoCategoryM,
    foreignKey: 'category_id'
});


VideoM.belongsToMany(ModelM, {
    through: VideoModelM,
    foreignKey: 'video_id'
});
ModelM.belongsToMany(VideoM, {
    through: VideoModelM,
    foreignKey: 'model_id'
});


VideoM.belongsToMany(StudioM, {
    through: VideoStudioM,
    foreignKey: 'video_id'
});
StudioM.belongsToMany(VideoM, {
    through: VideoStudioM,
    foreignKey: 'studio_id'
});


VideoM.belongsToMany(TagM, {
    through: VideoTagM,
    foreignKey: 'video_id'
});
TagM.belongsToMany(VideoM, {
    through: VideoTagM,
    foreignKey: 'tag_id'
});


VideoM.belongsToMany(SubscriberM, {
    through: LikeSubscriberM,
    foreignKey: 'video_id'
});
SubscriberM.belongsToMany(VideoM, {
    through: LikeSubscriberM,
    foreignKey: 'subscriber_id'
});

export const Video = VideoM;
export const Model = ModelM;
export const Category = CategoryM;
export const Studio = StudioM;
export const Tag = TagM;
export const Comment = CommentM;
export const Subscriber = SubscriberM;
export const LikeSubscriber = LikeSubscriberM;
export const DislikeSubscriber = DislikeSubscriberM;
export const VideoCategory = VideoCategoryM;
export const VideoStudio = VideoStudioM;
export const VideoModel = VideoModelM;