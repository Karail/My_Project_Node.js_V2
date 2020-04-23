import React from 'react'


export const LoginModal = ({ displayLog, closeModal, login, openPass, openRegister }) => {
  return (
    <div className="modal">
      <div className="modal-back" style={{ display: displayLog }} onClick={closeModal}></div>
      <div className="modal-login modal-block" style={{ display: displayLog }}>
        <form action="" className="modal-register-form" onSubmit={login}>
          <div>
            <input type="text" name="email" placeholder="Email" className="inp-def" />
          </div>
          <div>
            <input type="text" name="password" placeholder="Password" className="inp-def" />
          </div>
          <button type="submit" className="btn-main">Вход</button>
        </form>
        <p onClick={openPass}>Забыли пароль?</p>
        <p onClick={openRegister}>Создать аккаунт</p>
      </div>
    </div>
  )
}