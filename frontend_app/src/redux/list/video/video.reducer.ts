
import { initialStateType, actionReturnType } from './video.type'

const initialState: initialStateType = {
    isReady: false,
    items: [],
}

export default (state: initialStateType = initialState, action: actionReturnType): initialStateType => {
    switch (action.type) {
        case 'SET_VIDEO':
            return {
                ...state,
                items: action.payload,
                isReady: true,
            }
        case 'SET_NEXT_VIDEO':
            return {
                ...state,
                items: [...state.items, ...action.payload],
                isReady: true,
            }
        default:
            return state
    }
}