import React from 'react'
import { ProfileEdit } from '../../components/Profile/ProfileEdit'
import ProfileEditorAbstract from './abstract/ProfileEditorAbstract';

class ProfileEditContainer extends ProfileEditorAbstract {

    async componentDidMount() {
        super.componentDidMount()
        this.getEditVideoSettings()
    }

    getEditVideoSettings = async () => {
        try {
            const { serverURL, match } = this.props;
            const video_id = match.params.id

            const response = await fetch(`${serverURL}/movie/${video_id}`);
            const data = await response.json();
            this.setState({
                valueCategory: this.likenDataToState(data.category),
                valueModel: this.likenDataToState(data.model),
                valueStudio: this.likenDataToState(data.studio),
                name: data.video.name,
                privateCheck: !!data.video.private
            })

        } catch (err) {
            console.log(err);
        }
    }
    editVideo = async (e: any) => {

    }
    render() {
        return (
            <ProfileEdit
                editVideo={this.editVideo}
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

export default ProfileEditContainer