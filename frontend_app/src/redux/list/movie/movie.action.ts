
import { itemsMovieType, likeDislikeType } from '../../../type/movie.type'

import { setMovieType, updateLikeDislikeType, addCommentType, updateViewsType } from './movie.type'
import { itemsCommentType } from '../../../type/comment.type'

export const setMovie = (movie: itemsMovieType): setMovieType => ({
    type: 'SET_MOVIE',
    payload: movie
});

export const updateLikeDislike = (data: likeDislikeType): updateLikeDislikeType => ({
    type: 'LIKE_DISLIKE',
    payload: data
});

export const addComment = (data: itemsCommentType[]): addCommentType => ({
    type: 'ADD_COMMENT',
    payload: data
});

export const updateViews = (data: number): updateViewsType => ({
    type: 'UPDATE_VIEWS',
    payload: data
});
