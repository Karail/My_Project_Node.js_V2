
import { initialStateType, actionReturnType } from './filter.type'

const initialState: initialStateType = {
    searchQuery: '',
}

export default (state: initialStateType = initialState, action: actionReturnType): initialStateType => {
    switch (action.type) {
        case 'SET_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            }
        default:
            return state
    }
}