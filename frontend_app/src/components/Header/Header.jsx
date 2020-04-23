import React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../../func/cookie';

export const Header = ({ logout, openProfile, openLogin, openRegister, openSearch }) => {

    return (
        <div className="header-page">
            <div className="header">
                <div className="header-container">
                    <div className="header-main">
                        <a href="/">
                            <h1 className="header-main__title">
                                PornoFlow
                            </h1>
                        </a>
                        <div className="header-main-search">
                            <input type="text" className="header-main-search__item" placeholder="Поиск..." />
                            <button onClick={openSearch} className="header-main-search__btn"><i className="fa fa-search" aria-hidden="true"></i></button>
                            {
                                !!getCookie('token')
                                    ?
                                    <div className="header-main-login">
                                        <p className="header-main-login__log" onClick={openProfile}>Профиль</p>
                                        <p className="header-main-login__log" onClick={logout}>Выйти</p>
                                    </div>
                                    :
                                    <div className="header-main-login">
                                        <p className="header-main-login__log" onClick={openLogin}>Войти</p>
                                        <p className="header-main-login__log" onClick={openRegister}>Регистрация</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <hr className="hr" />
                <div className="header-category">
                    <ul className="header-category-list">
                        <Link to={'/'}><li className="header-category-list__item">Видео</li></Link>
                        <Link to={'/category'}><li className="header-category-list__item">Категории</li></Link>
                        <Link to={'/model'}><li className="header-category-list__item">Модели</li></Link>
                        <Link to={'/studio'}><li className="header-category-list__item">Студии</li></Link>
                    </ul>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}
