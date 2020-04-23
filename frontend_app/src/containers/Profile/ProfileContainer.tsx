import React, { Props } from 'react'

import { getCookie } from '../../func/cookie'
import { Redirect } from 'react-router'

import { Profile } from '../../components/Profile/Profile';

type PropsType = {
    serverURL: string,
}

class ProfileContainer extends React.Component<PropsType> {

    render() {

        console.log(this.props);

        if (!getCookie('token')) {
            return <Redirect to="/" />
        }

        return (
            <Profile {...this.props}/>
        )
    }
}

export default ProfileContainer