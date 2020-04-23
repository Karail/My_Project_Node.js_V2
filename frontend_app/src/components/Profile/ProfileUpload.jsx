import React from 'react'

export const ProfileUpload = ({ uploadVideo }) => {

  return (
    <div className="profile">
      <form onSubmit={uploadVideo}>
        <input type="text" placeholder="Название" name="name" className="inp-def" />
        <input type="file" name="file" />
        <button type="submit">Отправить</button>
      </form>
    </div>
  )

}