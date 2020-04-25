import React from 'react'

import { PasswordModal } from '../../../components/Modal/Password/PasswordModal'

type PropsType = {
    serverURL: string
    closeModal: () => void
    openModal: any
}

class PasswordModalContainer extends React.Component<PropsType> {

    password = async (e: any) => {
        try {
            e.preventDefault()
            const { serverURL } = this.props
            const formData = new FormData(e.target)

            const response = await fetch(`${serverURL}/password`, {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();

            if (data.status === 1) {
                alert(data.message)
                window.location.href = '/'
            } else {
                alert(data.message)
            }


        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <PasswordModal {...this.props} password={this.password} />
        )
    }
}

export default PasswordModalContainer