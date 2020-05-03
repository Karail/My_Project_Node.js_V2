import React from 'react'

import { ResetPassword } from '../components/ResetPassword'

import { Redirect } from 'react-router'

import { match } from "react-router";

type PropsType = {
    serverURL: string,
    match: match<{ token: string }>
}

class ResetPasswordContainer extends React.Component<PropsType> {

    state = {
        redirect: false
    }

    componentDidMount = async () => {
        try {
            const { serverURL, match } = this.props

            if (!match.params.token) {
                this.setState({ redirect: true })
            }

            const response = await fetch(`${serverURL}/newPassword/${match.params.token}`)
            const data = await response.json()

            if (data.status === 1) {
                console.log('good');
            } else {
                this.setState({ redirect: true })
            }
        } catch (err) {
            console.log(err)
        }
    }

    resetPasswordForm = async (e: any) => {
        try {
            e.preventDefault()
            const { serverURL, match } = this.props

            const formData = new FormData(e.target)

            formData.append('token', match.params.token)

            const response = await fetch(`${serverURL}/resetPassword`, {
                method: 'post',
                body: formData
            })
            const data = await response.json()

            if (data.status === 0) {
                return alert(data.message)
            }
            alert(data.message)
            this.setState({ redirect: true })

        } catch (err) {
            console.log(err)
        }
    }

    render() {

        if (this.state.redirect)
            return <Redirect to="/" />

        return (
            <ResetPassword
                resetPasswordForm={this.resetPasswordForm}
            />
        )
    }
}

export default ResetPasswordContainer