import React from 'react'
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
                        <a href="/"><li className="header-category-list__item">Видео</li></a>
                        <a href="/category"><li className="header-category-list__item">Категории</li></a>
                        <a href="/model"><li className="header-category-list__item">Модели</li></a>
                        <a href="/studio"><li className="header-category-list__item">Студии</li></a>
                    </ul>
                </div>
                <hr className="hr" />
            </div>
        </div>
    )
}
