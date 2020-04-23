import React from 'react'

export const ProfileMyVideoCard = ({ id, preview, name, href = 'movie', modifier = '', removeMy, playVideo, stopVideo }) => {

  return (
    <div className="main-content__item">
      <a href={`/${href}/${id}`}>
        <div className={`main-content__item__img ${modifier}`}>
          <video
            src={preview}
            className={`main-content__item main-content__item__img ${modifier}`}
            onMouseOver={e => playVideo(e)}
            onMouseOut={e => stopVideo(e)}
            muted
          />
        </div>
      </a>
      <div className="main-content__item__descr profile-main-content__item__descr">
        <p>{name}</p>
        <span onClick={(e) => { removeMy(e.target.id) }} id={id}>Редактировать</span>
        <span onClick={(e) => { removeMy(e.target.id) }} id={id}>Удалить</span>
      </div>
    </div>
  )
}