import React from 'react'

export const LoginModal = (props) => {

  const { displayLog, closeModal, login, openModal } = props
  
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
        <p onClick={openModal} data-name="displayPass">Забыли пароль?</p>
        <p onClick={openModal} data-name="displayReg">Создать аккаунт</p>
      </div>
    </div>
  )
}