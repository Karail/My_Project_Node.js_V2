import { combineReducers } from 'redux';

import video from './video/video.reducer'
import model from './model/model.reducer'
import movie from './movie/movie.reducer'
import filter from './filter/filter.reducer'
import listUrl from './listUrl/listUrl.reducer';

export const rootReducer = combineReducers({
    video,
    model,
    movie,
    filter,
    listUrl,
})

export type rootReducerType = ReturnType<typeof rootReducer>