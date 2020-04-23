

export type initialStateType = {
    isReady: boolean,
    url: string
}

export type updateListUrlType = {
    type: 'UPDATE_URL',
    payload: string
}
export type actionReturnType = updateListUrlType