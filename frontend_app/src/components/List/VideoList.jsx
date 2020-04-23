import React from 'react'

export const VideoList = (props) => {

  const { video, showVideo, Card } = props

  return (
    <div className="main-content">
      {
        video.map((elem, i) => (<Card {...elem} key={i} {...props} />))
      }
      <button onClick={showVideo} className="main__next-btn">Показать еще</button>
    </div>
  )
}