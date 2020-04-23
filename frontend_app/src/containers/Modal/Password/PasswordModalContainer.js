import React from 'react'

import { PasswordModal } from '../../../components/Modal/Password/PasswordModal'

class PasswordModalContainer extends React.Component {

    password = async (e) => {
        try {
            e.preventDefault()
            const { serverURL } = this.props
            const formData = new FormData(e.target)

            const response = await fetch(`${serverURL}/password`, {
                method: 'POST',
                // credentials: 'same-origin',
                body: formData,
            })
            console.log(response)
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