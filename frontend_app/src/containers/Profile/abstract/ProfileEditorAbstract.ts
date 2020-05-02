import React from 'react'
import { itemsModelType } from '../../../type/model.type';
import { match } from "react-router";

type PropsType = {
  serverURL: string
  match: match<{ id: string }>
}

type optionsType = {
  value: number,
  label: string
}

type StateType = {
  optionsCategory: optionsType[]
  optionsModel: optionsType[]
  optionsStudio: optionsType[]
  valueCategory: optionsType[]
  valueStudio: optionsType[]
  valueModel: optionsType[]
  name: string,
  privateCheck: boolean
}

abstract class ProfileEditorAbstract extends React.Component<PropsType, StateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      optionsCategory: [],
      optionsStudio: [],
      optionsModel: [],
      valueCategory: [],
      valueStudio: [],
      valueModel: [],
      name: '',
      privateCheck: false
    };
  }

  likenDataToState = (data: itemsModelType[]) => {
    const newState: optionsType[] = []
    data.forEach((el) => {
      newState.push({
        value: el.id,
        label: el.name
      })
    });
    return newState
  }

  async updateState(url: string) {
    try {
      const { serverURL } = this.props
      const response = await fetch(`${serverURL}/${url}`)
      const data: itemsModelType[] = await response.json()
      return this.likenDataToState(data)
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    const category = await this.updateState('category')
    const model = await this.updateState('model')
    const studio = await this.updateState('studio')
    if (category && model && studio) {
      this.setState({
        optionsCategory: category,
        optionsModel: model,
        optionsStudio: studio
      })
    }
  }

}
export default ProfileEditorAbstract