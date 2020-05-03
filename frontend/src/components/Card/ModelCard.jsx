import React from 'react'

export const ModelCard = ({ id, img, name, href = 'movie', modifier = '' }) => {
  return (
    <a href={`/${href}/${id}`}>
      <div className={`main-content__item main-content__item__img ${modifier}`} style={{ backgroundImage: `url(${img})` }}>
        <div className="main-content__item__descr">
          <p>{name}</p>
        </div>
      </div>
    </a>
  )
}