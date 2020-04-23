
import { itemsVideoType } from './video.type'
import { itemsModelType } from './model.type'
import { itemsCommentType } from './comment.type';

export type itemsMovieType = {
    video: itemsVideoType,
    category: itemsModelType[],
    model: itemsModelType[],
    studio: itemsModelType[],
    tag: [],
    comment: itemsCommentType[],
}

export type likeDislikeType = {
    like: number,
    dislike: number,
}