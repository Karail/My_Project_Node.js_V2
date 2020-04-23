

export const playVideo = (event) => {
  event.target.play()
}

export const stopVideo = (event) => {
  event.target.pause()
  event.target.currentTime = 0
}