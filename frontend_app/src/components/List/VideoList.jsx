import React from 'react'

export const VideoList = (props) => {

  const { video, showNextVideo, Card, updateSort } = props

  return (
    <div>
      <button onClick={updateSort} data-sort="id">По дате</button>
      <button onClick={updateSort} data-sort="views">По просмотрам</button>
      <button onClick={updateSort} data-sort="like">По рейтингу</button>
      <div className="main-content">

        {
          video.map((elem, i) => (<Card {...elem} key={i} {...props} />))
        }
        <button onClick={showNextVideo} className="main__next-btn">Показать еще</button>
      </div>
    </div>
  )
}