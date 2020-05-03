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

type modelsGroupType = {
  category: itemsModelType[]
  model: itemsModelType[]
  studio: itemsModelType[]
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

  async componentDidMount() {
    try {

      const { serverURL } = this.props

      const  response = await fetch(`${serverURL}/modelsForSelect`)

      const data: modelsGroupType = await response.json()

      const category = this.likenDataToState(data.category);
      const model = this.likenDataToState(data.model);
      const studio = this.likenDataToState(data.studio);

      this.setState({
        optionsCategory: category,
        optionsModel: model,
        optionsStudio: studio
      })

    } catch (err) {
      console.log(err)
    }
  }

  onInputChangePrivate = (e: any) => {
    this.setState({ privateCheck: e.target.checked });
  }
  onInputChangeCategory = (e: any) => {
    this.setState({ valueCategory: e });
  }
  onInputChangeModel = (e: any) => {
    this.setState({ valueModel: e });
  }
  onInputChangeStudio = (e: any) => {
    this.setState({ valueStudio: e });
  }

}
export default ProfileEditorAbstract