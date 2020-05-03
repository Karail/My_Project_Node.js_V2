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

            await this.setState({
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

    removeMy = async () => {
        try {
            const { serverURL, match } = this.props
            const response = await fetch(`${serverURL}/removeMyVideo?video_id=${match.params.id}`, {
                method: 'delete',
                credentials: 'include',
            })
            location.href = '/profile/myVideo'
        } catch (err) {
            console.log(err)
        }
    }

    editMy = async (e: any) => {
        try {
            e.preventDefault()
            const { serverURL, match } = this.props

            const formData = new FormData(e.target)

            const response = await fetch(`${serverURL}/editMyVideo?video_id=${match.params.id}`, {
                method: 'post',
                credentials: 'include',
                body: formData
            })
            const data = await response.json();
            console.log(data);
            location.href = `/movie/${data.id}`;

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <ProfileEdit
                editMy={this.editMy}
                optionsCategory={this.state.optionsCategory}
                optionsStudio={this.state.optionsStudio}
                optionsModel={this.state.optionsModel}
                valueCategory={this.state.valueCategory}
                valueModel={this.state.valueModel}
                valueStudio={this.state.valueStudio}
                name={this.state.name}
                privateCheck={this.state.privateCheck}
                removeMy={this.removeMy}

                onInputChangePrivate={this.onInputChangePrivate}
                onInputChangeCategory={this.onInputChangeCategory}
                onInputChangeModel={this.onInputChangeModel}
                onInputChangeStudio={this.onInputChangeStudio}
            />
        )
    }
}

export default ProfileEditContainer