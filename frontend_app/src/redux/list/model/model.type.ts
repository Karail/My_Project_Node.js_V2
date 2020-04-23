
import { itemsModelType } from '../../../type/model.type'

export type initialStateType = {
    isReady: boolean,
    items: itemsModelType[]
}

export type setModelType = {
    type: 'SET_MODEL',
    payload: itemsModelType[],
}

export type actionReturnType = setModelType