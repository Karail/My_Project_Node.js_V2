import React from 'react'

import { Header } from '../../components/Header/Header'

import RegisterModalContainer from '../Modal/Register/RegisterModalContainer'
import PasswordModalContainer from '../Modal/Password/PasswordModalContainer'
import LoginModalContainer from '../Modal/Login/LoginModalContainer'
import { deleteCookie } from '../../func/cookie'


type PropsType = {
    serverURL: string
}

class HeaderContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            displayReg: 'none',
            displayLog: 'none',
            displayPass: 'none',
        }
    }

    openModal = (e: any) => {
        this.closeModal()
        this.setState({
            [e.target.dataset.name]: 'block',
        })
    }

    closeModal = () => {
        this.setState({
            displayReg: 'none',
            displayLog: 'none',
            displayPass: 'none',
        })
    }

    openProfile = () => {
        window.location.href = '/profile'
    }

    logout = () => {
        deleteCookie('token')
        window.location.reload()
    }

    openSearch = () => {

        const $search = document.querySelector('.header-main-search__item') as HTMLInputElement

        const search = $search.value.trim()

        window.location.href = `/search/${search}`
    }

    render() {
        return (
            <div>
                <Header
                    {...this.props}
                    logout={this.logout}
                    openProfile={this.openProfile}
                    openModal={this.openModal}
                    openSearch={this.openSearch}
                />

                <RegisterModalContainer
                    {...this.props}
                    {...this.state}
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                />

                <LoginModalContainer
                    {...this.props}
                    {...this.state}
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                />
                <PasswordModalContainer
                    {...this.props}
                    {...this.state}
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                />
            </div>
        )
    }
}
export default HeaderContainer;