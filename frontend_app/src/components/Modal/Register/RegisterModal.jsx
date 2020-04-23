import React from 'react'


export const RegisterModal = ({ displayReg, closeModal, register, openLogin }) => {
  return (
    <div className="modal">
      <div className="modal-back" style={{ display: displayReg }} onClick={closeModal}></div>
      <div className="modal-register modal-block" style={{ display: displayReg }}>
        <form action="" className="modal-register-form" onSubmit={register}>
          <div>
            <input type="text" name="name" placeholder="Ник" className="inp-def" />
          </div>
          <div>
            <input type="text" name="email" placeholder="Email" className="inp-def" />
          </div>
          <div>
            <input type="text" name="password" id="password" placeholder="Password" className="inp-def" />
          </div>
          <button type="submit" className="btn-main" id="reg-btn">Зарегистрироваться</button>
        </form>
        <p onClick={openLogin}>Войти</p>
      </div>
    </div>
  )
}