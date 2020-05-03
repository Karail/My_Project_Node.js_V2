import React from 'react'

export const ProfileLikeVideoCard = ({ id, preview, name, href = 'movie', modifier = '', removeLikeVideo, playVideo, stopVideo }) => {

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
        <span onClick={(e) => { removeLikeVideo(e.target.id) }} id={id}>Удалить</span>
      </div>
    </div>
  )
}