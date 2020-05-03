

import { setSearchQueryType } from './filter.type'

export const setSearchQuery = (value: string): setSearchQueryType => ({
    type: 'SET_QUERY',
    payload: value,
})