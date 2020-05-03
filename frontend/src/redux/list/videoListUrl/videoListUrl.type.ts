

export type initialStateType = {
    isReady: boolean,
    url: string
}

export type updateVideoListUrlType = {
    type: 'UPDATE_URL',
    payload: string
}
export type actionReturnType = updateVideoListUrlType