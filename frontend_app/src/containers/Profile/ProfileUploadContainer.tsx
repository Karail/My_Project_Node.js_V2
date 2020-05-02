import React from 'react';
import { ProfileUpload } from '../../components/Profile/ProfileUpload';
import ProfileEditorAbstract from './abstract/ProfileEditorAbstract';

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

        valueCategory={this.state.valueCategory}
        valueModel={this.state.valueModel}
        valueStudio={this.state.valueStudio}

        name={this.state.name}
        privateCheck={this.state.privateCheck}
      />
    )
  }
}
export default ProfileUploadContainer