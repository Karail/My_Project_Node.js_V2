import React from 'react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from '../../redux/list/movie/movie.action'

import { Movie } from '../../components/Movie/Movie'

import { itemsMovieType } from '../../type/movie.type'
import { setMovieType } from '../../redux/list/movie/movie.type'
import { setSearchQueryType } from '../../redux/list/filter/filter.type'

import { rootReducerType } from '../../redux/list'

import { ILstContainer } from '../../interfaces/ListContainer'

type PropsType = {
  setMovie: (data: itemsMovieType) => setMovieType,
  serverURL: string,
  movie: itemsMovieType,
  setSearchQuery: (value: string) => setSearchQueryType,
  match: any,
}


class MovieContainer extends React.Component<PropsType> implements ILstContainer {
  componentDidMount = async () => {
    try {
      const { setMovie, serverURL, match } = this.props;
      const video_id = match.params.id
      const response = await fetch(`${serverURL}/movie/${video_id}`)
      if (response.status === 500) throw new Error()
      const data = await response.json()
      setMovie(data)
    } catch (err) {
      console.log(err)
    }
  }

  componentWillMount = async () => {
    try {
      const { setMovie, serverURL, match } = this.props;
      const video_id = match.params.id
      const response = await fetch(`${serverURL}/movie/${video_id}`)
      if (response.status === 500) throw new Error()
      const data = await response.json()
      setMovie(data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <Movie {...this.props} />
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
const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators(movieActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);