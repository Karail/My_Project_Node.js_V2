import React from 'react'

import { LoginModal } from '../../../components/Modal/Login/LoginModal'
import { setCookie } from '../../../func/cookie'

class LoginModalContainer extends React.Component {
    
    login = async (e) => {
        try {
            e.preventDefault()
            const { serverURL } = this.props
            const formData = new FormData(e.target)

            const response = await fetch(`${serverURL}/login`, {
                method: 'POST',
                // credentials: 'same-origin',
                body: formData,
            })
            const data = await response.json();
            console.log(data)

            if (data.token)
                setCookie('token', data.token)

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <LoginModal {...this.props} login={this.login} />
        )
    }
}

export default LoginModalContainer