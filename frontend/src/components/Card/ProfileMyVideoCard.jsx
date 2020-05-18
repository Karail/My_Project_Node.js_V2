import React from 'react'

export const ProfileMyVideoCard = ({ id, preview, name, href = 'movie', modifier = '', playVideo, stopVideo }) => {

  return (
    <div className="main-content__item">
      <a href={`/${href}/${id}`}>
        <div className={`main-content__item__img ${modifier}`}>
          <video
            src={preview}
            className={`main-content__item main-content__item__img ${modifier}`}
            onMouseOver={playVideo}
            onMouseOut={stopVideo}
            muted
            loop
          />
        </div>
      </a>
      <div className="main-content__item__descr profile-main-content__item__descr">
        <p>{name}</p>
        <a href={`/profile/edit/${id}`}>Редактировать</a>
      </div>
    </div>
  )
}
