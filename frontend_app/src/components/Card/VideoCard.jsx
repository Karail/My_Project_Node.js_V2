import React from 'react'

export const VideoCard = ({ id, name, preview, href = 'movie', modifier = '', playVideo, stopVideo }) => {
  return (
    <a href={`/${href}/${id}`}>
      <div className={`main-content__item main-content__item__img ${modifier}`}>
        <video
          src={preview}
          className={`main-content__item main-content__item__img ${modifier}`}
          onMouseOver={playVideo}
          onMouseOut={stopVideo}
          muted
          loop
        />
        <div className="main-content__item__descr">
          <p>{name}</p>
        </div>
      </div>
    </a>
  )
}