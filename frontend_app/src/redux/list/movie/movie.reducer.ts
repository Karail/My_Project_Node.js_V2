
import { initialStateType, actionReturnType } from './movie.type'
import { itemsVideoType } from '../../../type/video.type'

const initialState: initialStateType = {
    isReady: false,
    items: {
        video: <itemsVideoType>{},
        category: [],
        model: [],
        studio: [],
        tag: [],
        comment: [],
        recommended: []
    },
}

export default (state: initialStateType = initialState, action: actionReturnType): initialStateType => {
    switch (action.type) {
        case 'SET_MOVIE':
            return {
                ...state,
                items: action.payload,
                isReady: true,
            }
        case 'LIKE_DISLIKE':
            return {
                ...state,
                items: {
                    ...state.items,
                    video: {
                        ...state.items.video,
                        dislike: action.payload.dislike,
                        like: action.payload.like,

                    }
                },
                isReady: true,
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                items: {
                    ...state.items,
                    comment: action.payload
                },
                isReady: true,
            }
        case 'UPDATE_VIEWS':
            return {
                ...state,
                items: {
                    ...state.items,
                    video: {
                        ...state.items.video,
                        views: action.payload,
                    }
                },
                isReady: true,
            }
        default:
            return state
    }
}