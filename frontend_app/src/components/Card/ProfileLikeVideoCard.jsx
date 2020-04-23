import React from 'react'

export const ProfileLikeVideoCard = ({ id, preview, name, href = 'movie', modifier = '', removeLike, playVideo, stopVideo }) => {

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
        <span onClick={(e) => { removeLike(e.target.id) }} id={id}>Удалить</span>
      </div>
    </div>
  )
}