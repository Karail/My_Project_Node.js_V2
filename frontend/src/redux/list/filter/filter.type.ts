

export type initialStateType = {
    searchQuery: string,
    filterBy: string,
} 

export type setSearchQueryType = {
    type: 'SET_QUERY',
    payload: string,
}

export type actionReturnType = setSearchQueryType