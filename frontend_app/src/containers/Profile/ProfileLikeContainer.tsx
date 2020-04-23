import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import * as videoActions from '../../redux/list/video/video.action'
import * as filterActions from '../../redux/list/filter/filter.action'

import { search } from '../../func/filter'
import { playVideo, stopVideo } from '../../func/actionVideo'

import { ModelList } from '../../components/List/ModelList'
import { ProfileLikeVideoCard } from '../../components/Card/ProfileLikeVideoCard'

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

type StateType = {
}


class ProfileLikeContainer extends React.Component<PropsType, StateType> {

  async componentDidMount() {
    try {
      const { setVideo, serverURL, setSearchQuery } = this.props

      const $seacrh = document.querySelector('#search') as HTMLInputElement

      $seacrh.value = ''

      setSearchQuery('')

      const response = await fetch(`${serverURL}/showLikeVideo`, {
        credentials: 'include',
      })

      const data: itemsVideoType[] = await response.json()
      setVideo(data)

    } catch (err) {
      console.log(err)
    }
  }

  removeLikeVideo = async (id: number) => {
    try {
      const { setVideo, serverURL } = this.props
      const response = await fetch(`${serverURL}/removeLikeVideo?video_id=${id}`, {
        method: 'delete',
        credentials: 'include',
      })
      const data = await response.json()
      setVideo(data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { setSearchQuery, video } = this.props
    return (
      <ModelList
        items={video}
        removeLikeVideo={this.removeLikeVideo}
        setSearchQuery={setSearchQuery}
        Card={ProfileLikeVideoCard}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLikeContainer)
