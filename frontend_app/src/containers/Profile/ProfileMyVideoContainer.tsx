import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as videoActions from '../../redux/list/video/video.action'
import * as filterActions from '../../redux/list/filter/filter.action'

import { search } from '../../func/filter'
import { playVideo, stopVideo } from '../../func/actionVideo'

import { ModelList } from '../../components/List/ModelList'
import { ProfileMyVideoCard } from '../../components/Card/ProfileMyVideoCard'

import { rootReducerType } from '../../redux/list'

import { setSearchQueryType } from '../../redux/list/filter/filter.type'
import { setVideoType } from '../../redux/list/video/video.type'

import { itemsVideoType } from '../../type/video.type'

type PropsType = {
  video: itemsVideoType[],
  serverURL: string,
  setVideo: (data: itemsVideoType[]) => setVideoType,
  setSearchQuery: (value: string) => setSearchQueryType,
}

class ProfileMyVideoContainer extends React.Component<PropsType> {

  async componentDidMount() {
    try {
      const { setVideo, serverURL, setSearchQuery } = this.props

      const $seacrh = document.querySelector('#search') as HTMLInputElement

      $seacrh.value = ''
      setSearchQuery('')


      const response = await fetch(`${serverURL}/showMyVideo`, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
      })

      const data: itemsVideoType[] = await response.json()
      setVideo(data)
      console.log(data);

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { setSearchQuery, video } = this.props
    return (
      <ModelList
        items={video}
        setSearchQuery={setSearchQuery}
        Card={ProfileMyVideoCard}
        playVideo={playVideo}
        stopVideo={stopVideo}
      />
    )
  }
}

//передача данных из redux в компонент
const mapStateToProps = ({ video, filter }: rootReducerType) => ({
  video: video.items && search(video.items, filter.searchQuery),
  isReady: video.isReady,
});

// передача action в компонент
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(videoActions, dispatch),
  ...bindActionCreators(filterActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMyVideoContainer)
