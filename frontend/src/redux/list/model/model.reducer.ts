
import { initialStateType, actionReturnType } from './model.type'

const initialState: initialStateType = {
    isReady: false,
    items: [],
}

export default (state: initialStateType = initialState, action: actionReturnType): initialStateType => {
    switch (action.type) {
        case 'SET_MODEL':
            return {
                ...state,
                items: action.payload,
                isReady: true,
            }
        default:
            return state
    }
}