import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../../redux/list/video/video.action'
import * as filterActions from '../../redux/list/filter/filter.action'

import { search } from '../../func/filter'
import { playVideo, stopVideo } from '../../func/actionVideo'

import { SearchList } from '../../components/List/SearchList'
import { ProfileLikeVideoCard } from '../../components/Card/ProfileLikeVideoCard'

import { rootReducerType } from '../../redux/list'

import { setSearchQueryType } from '../../redux/list/filter/filter.type'
import { setVideoType } from '../../redux/list/video/video.type'

import { itemsVideoType } from '../../type/video.type'

import { ILstContainer } from '../../interfaces/ListContainer'


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
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
      })

      const data: itemsVideoType[] = await response.json()
      setVideo(data)

    } catch (err) {
      console.log(err)
    }
  }

  removeLike = async (id: number) => {
    try {
      const { setVideo, serverURL } = this.props
      const response = await fetch(`${serverURL}/delLike`, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify(id)
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
      <SearchList
        items={video}
        removeLike={this.removeLike}
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
const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(videoActions, dispatch),
  ...bindActionCreators(filterActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLikeContainer)
