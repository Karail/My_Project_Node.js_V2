
import { updateListUrlType } from './listUrl.type'

export const updateListUrl = (url: string): updateListUrlType => ({
    type: 'UPDATE_URL',
    payload: url
});