import React from 'react'
import { ProfileUpload } from '../../components/Profile/ProfileUpload'
import { itemsModelType } from '../../type/model.type';
import e from 'express';


type PropsType = {
  serverURL: string,
}

type optionsType = {
  value: number,
  label: string
}[]

type StateType = {
  optionsCategory: optionsType
  optionsModel: optionsType
  optionsStudio: optionsType
}

class ProfileUploadContainer extends React.Component<PropsType, StateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      optionsCategory: [],
      optionsStudio: [],
      optionsModel: []
    };
  }

  async updateState(name: string) {
    try {
      const { serverURL } = this.props
      const response = await fetch(`${serverURL}/${name}`)
      const data: itemsModelType[] = await response.json()
      const newState: optionsType = []
      data.forEach((el) => {
        newState.push({
          value: el.id,
          label: el.name
        })
      });
      return newState
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
        optionsCategory: category
      })
      this.setState({
        optionsModel: model
      })
      this.setState({
        optionsStudio: studio
      })
    }
  }

  uploadVideo = async (e: any) => {
    try {
      e.preventDefault()

      const { serverURL } = this.props;

      const formData = new FormData(e.target)

      console.log('...');

      const response = await fetch(`${serverURL}/uploadVideo`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json()

      if (response.status != 200) {
        throw data
      }

      alert(data)

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <ProfileUpload
        uploadVideo={this.uploadVideo}
        optionsCategory={this.state.optionsCategory}
        optionsStudio={this.state.optionsStudio}
        optionsModel={this.state.optionsModel}
      />
    )
  }
}
export default ProfileUploadContainer