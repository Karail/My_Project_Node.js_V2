import React from 'react'

import { RegisterModal } from '../../../components/Modal/Register/RegisterModal'
import { setCookie } from '../../../func/cookie'


class RegisterModalContainer extends React.Component {

    register = async (event) => {
        try {
            event.preventDefault()
            const { serverURL } = this.props
            const formData = new FormData(event.target)

            const response = await fetch(`${serverURL}/register`, {
                method: 'POST',
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
            <RegisterModal {...this.props} register={this.register} />
        )
    }
}

export default RegisterModalContainer