
import { itemsVideoType } from '../../../type/video.type'

import { setVideoType, setNextVideoType } from './video.type'

export const setVideo = (video: itemsVideoType[]): setVideoType => ({
    type: 'SET_VIDEO',
    payload: video
});

export const setNextVideo = (video: itemsVideoType[]): setNextVideoType => ({
    type: 'SET_NEXT_VIDEO',
    payload: video
});