import React from 'react'


export const PasswordModal = (props) => {

  const { displayPass, closeModal, password, openModal } = props

  return (
    <div className="modal">
      <div className="modal-back" style={{ display: displayPass }} onClick={closeModal}></div>
      <div className="modal-password modal-block" style={{ display: displayPass }}>
        <form action="" className="modal-password-form" onSubmit={password}>
          <div>
            <input type="text" name="email" placeholder="Email" className="inp-def" />
          </div>
          <button type="submit" className="btn-main">Отправить</button>
        </form>
        <p onClick={openModal} data-name="displayLog">Вход</p>
      </div>
    </div>
  )
}