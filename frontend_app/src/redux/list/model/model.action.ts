
import {itemsModelType} from '../../../type/model.type'
import { setModelType } from './model.type'

export const setModel = (model: itemsModelType[]): setModelType => ({
    type: 'SET_MODEL',
    payload: model,
})