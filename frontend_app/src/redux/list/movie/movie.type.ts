
import { itemsMovieType, likeDislikeType } from '../../../type/movie.type'
import { itemsCommentType } from '../../../type/comment.type';

export type initialStateType = {
    isReady: boolean,
    items: itemsMovieType
}

export type setMovieType = {
    type: 'SET_MOVIE',
    payload: itemsMovieType
}

export type updateLikeDislikeType = {
    type: 'LIKE_DISLIKE',
    payload: likeDislikeType,
}

export type addCommentType = {
    type: 'ADD_COMMENT',
    payload: itemsCommentType[],
}

export type actionReturnType = setMovieType | updateLikeDislikeType | addCommentType