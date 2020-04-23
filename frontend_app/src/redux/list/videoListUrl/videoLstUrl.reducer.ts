
import { initialStateType, actionReturnType } from './videoListUrl.type'

const initialState: initialStateType = {
    isReady: false,
    url: '/',
}

export default (state: initialStateType = initialState, action: actionReturnType): initialStateType => {
    switch (action.type) {
        case 'UPDATE_URL':
            return {
                ...state,
                url: action.payload,
                isReady: true,
            }
        default:
            return state
    }
}