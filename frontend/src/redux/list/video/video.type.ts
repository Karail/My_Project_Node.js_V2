
import { itemsVideoType } from '../../../type/video.type'

export type initialStateType = {
    isReady: boolean,
    items: itemsVideoType[]
}

export type setNextVideoType = {
    type: 'SET_NEXT_VIDEO',
    payload: itemsVideoType[]
}

export type setVideoType = {
    type: 'SET_VIDEO',
    payload: itemsVideoType[]
}

export type actionReturnType = setVideoType | setNextVideoType