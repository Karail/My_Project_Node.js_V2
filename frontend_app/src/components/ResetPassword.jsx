import React from 'react'

export const ResetPassword = ({ resetPasswordForm }) => {

  return (
    <div className="reset-password">
      <form onSubmit={resetPasswordForm}>
        <div>
          <input type="password" placeholder="Новый пароль" name="pass" className="inp-def" />
          <input type="password" placeholder="Повторите пароль" name="rpass" className="inp-def" />
        </div>
        <button type="submit" className="btn-main">Отправить</button>
      </form>
    </div>
  )

}