

import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as videoActions from '../redux/list/video/video.action';
import * as listUrlActions from '../redux/list/videoListUrl/videoListUrl.action';

import { playVideo, stopVideo } from '../func/actionVideo';

import { rootReducerType } from '../redux/list'
import { setVideoType, setNextVideoType } from '../redux/list/video/video.type';
import { itemsVideoType } from '../type/video.type';
import { updateVideoListUrlType } from '../redux/list/videoListUrl/videoListUrl.type';

import { VideoList } from '../components/List/VideoList';
import { VideoCard } from '../components/Card/VideoCard';

import { match } from "react-router";

type PropsType = {
  setVideo: (data: itemsVideoType[]) => setVideoType,
  setNextVideo: (data: itemsVideoType[]) => setNextVideoType,
  serverURL: string,
  video: itemsVideoType[],
  match: match<{ id?: string }>,
  limit: number,
  tableName: string,
  nextUrl: string,
  updateVideoListUrl: (data: string) => updateVideoListUrlType,
}

type dataType = {
  data: itemsVideoType[],
  nextOffset: string
}
type StateType = {
  sort: string
}
class VideoListContainer extends React.Component<PropsType, StateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      sort: 'like'
    }
  }


  responseMiddleware = async (url = this.props.nextUrl, sort: string) => {
    try {
      const { serverURL, match, limit, tableName, updateVideoListUrl } = this.props

      if (!match.params.id) {
        match.params.id = ''
      }

      const response = await fetch(url)
      const data: dataType = await response.json()

      updateVideoListUrl(`${serverURL}/${tableName}${match.params.id}?limit=${limit}&offset=${data.nextOffset}&sort=${sort}`)

      const btn = document.querySelector('.main__next-btn') as HTMLButtonElement

      if (data.data.length < limit) {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
      return data.data
    } catch (err) {
      throw err
    }
  }

  showVideo = async (sort: string) => {
    try {
      const { serverURL, match, limit, tableName, updateVideoListUrl, setVideo } = this.props

      if (!match.params.id) {
        match.params.id = ''
      }

      const actionData = updateVideoListUrl(`${serverURL}/${tableName}${match.params.id}?limit=${limit}&offset=0&sort=${sort}`)

      const data = await this.responseMiddleware(actionData.payload, sort)
      setVideo(data)
    } catch (err) {
      console.log(err)
    }
  }

  showNextVideo = async () => {
    try {
      const { setNextVideo } = this.props;

      const { sort } = this.state

      const data = await this.responseMiddleware(undefined, sort)
      setNextVideo(data)
    } catch (err) {
      console.log(err)
    }
  }

  updateSort = async (e: any) => {
    await this.setState({
      sort: e.target.dataset.sort
    })
    const { sort } = this.state

    this.showVideo(sort)
  }

  componentDidMount = () => {
    const { sort } = this.state
    this.showVideo(sort)
  }

  render() {
    return (
      <VideoList
        {...this.props}
        showNextVideo={this.showNextVideo}
        Card={VideoCard}
        playVideo={playVideo}
        stopVideo={stopVideo}
        updateSort={this.updateSort}
      />
    )
  }

}

//передача данных из redux в компонент
const mapStateToProps = ({ video, listUrl }: rootReducerType) => ({
  nextUrl: listUrl.url,
  video: video.items,
  isReady: video.isReady,
});

// передача action в компонент
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(videoActions, dispatch),
  ...bindActionCreators(listUrlActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoListContainer) 