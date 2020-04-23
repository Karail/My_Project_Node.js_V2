

export const playVideo = (event) => {
  event.target.play()
}

export const stopVideo = (event) => {
  event.target.pause()
  event.target.load()
}

export const TimeUpdateVideo = () => {
  // document.querySelectorAll('.main-content__item__img').forEach((el, i) => {

  //   el.onloadedmetadata = () => {
  //     const fullTime = el.duration / 2

  //     el.currentTime = fullTime
  //   }
  // })
}