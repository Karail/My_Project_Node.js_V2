
import { updateVideoListUrlType } from './videoListUrl.type'

export const updateVideoListUrl = (url: string): updateVideoListUrlType => ({
    type: 'UPDATE_URL',
    payload: url
});