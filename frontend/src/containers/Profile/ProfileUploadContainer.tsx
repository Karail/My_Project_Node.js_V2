import React from 'react';
import { ProfileUpload } from '../../components/Profile/ProfileUpload';
import ProfileEditorAbstract from './abstract/ProfileEditorAbstract';
import { itemsVideoType } from '../../type/video.type';
class ProfileUploadContainer extends ProfileEditorAbstract {

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

      const data: number | Error = await response.json()

      if (response.status != 200) {
        throw data
      }

      location.href = `/movie/${data}`

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

        valueCategory={this.state.valueCategory}
        valueModel={this.state.valueModel}
        valueStudio={this.state.valueStudio}

        name={this.state.name}
        privateCheck={this.state.privateCheck}
        
        onInputChangePrivate={this.onInputChangePrivate}
        onInputChangeCategory={this.onInputChangeCategory}
        onInputChangeModel={this.onInputChangeModel}
        onInputChangeStudio={this.onInputChangeStudio}
      />
    )
  }
}
export default ProfileUploadContainer