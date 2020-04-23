

import React from 'react'
import { IBase } from './Base'
import { itemsVideoType } from '../type/video.type';

export interface IVideoLstContainer extends IBase {
    componentDidMount: () => void
    responseMiddleware: (url?: string) => Promise<itemsVideoType[]>
    showVideo: () => void
}