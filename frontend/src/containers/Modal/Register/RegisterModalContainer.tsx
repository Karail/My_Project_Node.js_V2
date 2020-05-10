import React from 'react'

import { RegisterModal } from '../../../components/Modal/Register/RegisterModal'
import { setCookie } from '../../../func/cookie'

type PropsType = {
    serverURL: string
    closeModal: () => void
    openModal: any
}

class RegisterModalContainer extends React.Component<PropsType> {

    register = async (e: any) => {
        try {
            e.preventDefault()
            const { serverURL, closeModal } = this.props
            const formData = new FormData(e.target)

            const response = await fetch(`${serverURL}/register`, {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            console.log(data)

            if (data.token) {
                setCookie('token', data.token, { 'max-age': 3000 })
                closeModal()
            }

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