import React from 'react'
import { ProfileUpload } from '../../components/Profile/ProfileUpload'
import { EventType } from '@testing-library/react'


type PropsType = {
  serverURL: string,
}


class ProfileUploadContainer extends React.Component<PropsType> {

  uploadVideo = async (event: any) => {
    try {
      event.preventDefault()

      const { serverURL } = this.props;

      const formData = new FormData(event.target)

      console.log('...');

      const response = await fetch(`${serverURL}/uploadVideo`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json()

      console.log(data)

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <ProfileUpload uploadVideo={this.uploadVideo} />
    )
  }
}
export default ProfileUploadContainer