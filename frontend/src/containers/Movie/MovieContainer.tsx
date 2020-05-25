import React from 'react'

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as movieActions from '../../redux/list/movie/movie.action'

import { Movie } from '../../components/Movie/Movie'

import { itemsMovieType } from '../../type/movie.type'
import { setMovieType, updateViewsType } from '../../redux/list/movie/movie.type'
import { setSearchQueryType } from '../../redux/list/filter/filter.type'

import { rootReducerType } from '../../redux/list'
import { match } from "react-router";

import { getCookie } from '../../func/cookie';

type PropsType = {
  setMovie: (data: itemsMovieType) => setMovieType
  serverURL: string
  movie: itemsMovieType
  setSearchQuery: (value: string) => setSearchQueryType
  match: match<{ id: string }>
  updateViews: (data: number) => updateViewsType
}
type StateType = {
  actionViewsLimit: boolean
}

class MovieContainer extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      actionViewsLimit: true
    }
  }

  componentDidMount = async () => {
    try {
      const { setMovie, serverURL, match } = this.props;
      const video_id = match.params.id
      const response = await fetch(`${serverURL}/movie/${video_id}`)
      if (response.status === 500) throw new Error()
      const data: itemsMovieType = await response.json()

      if (data.video.private) {
        if (!!getCookie('token')) {

          const response = await fetch(`${serverURL}/checkPrivate/${video_id}`, {
            credentials: 'include',
          })
          const data: boolean = await response.json()

          if (data) {
            location.href = '/'
          }

        } else {
          location.href = '/'
        }
      }

      setMovie(data)
    } catch (err) {
      console.log(err)
    }
  }

  updateViews = async () => {

    const { updateViews, serverURL, match } = this.props

    this.setState({
      actionViewsLimit: false
    })

    if (this.state.actionViewsLimit) {

      const video_id = match.params.id

      const response = await fetch(`${serverURL}/updateViews`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          video_id,
        })
      });
      const data = await response.json();
      updateViews(data.views)
    }
  }

  render() {
    return (
      <div>
        <Movie {...this.props} updateViews={this.updateViews} />
      </div>
    )
  }
}

//передача данных из redux в компонент
const mapStateToProps = ({ movie }: rootReducerType) => ({
  movie: movie.items,
  isReady: movie.isReady,
});

// передача action в компонент
const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(movieActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);