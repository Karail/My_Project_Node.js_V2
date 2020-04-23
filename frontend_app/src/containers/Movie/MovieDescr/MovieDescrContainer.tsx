import React from 'react'

import { IBase } from '../../../interfaces/Base'
import { MovieDescr } from '../../../components/Movie/MovieDescr/MovieDescr'
import { getCookie } from '../../../func/cookie'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from '../../../redux/list/movie/movie.action'

import { updateLikeDislikeType } from '../../../redux/list/movie/movie.type'
import { likeDislikeType } from '../../../type/movie.type';

import { rootReducerType } from '../../../redux/list'
import { itemsMovieType } from '../../../type/movie.type'

interface IMovieDescrContainer extends IBase {
    likeFunc: () => void
    dislikeFunc: () => void
}

type PropsType = {
    serverURL: string,
    match: any,
    movie: itemsMovieType,
    updateLikeDislike: (data: likeDislikeType) => updateLikeDislikeType
}

class MovieDescrContainer extends React.Component<PropsType> implements IMovieDescrContainer {

    likeFunc = async () => {
        if (getCookie('token')) {
            const { serverURL, match, movie, updateLikeDislike } = this.props
            const response = await fetch(`${serverURL}/addLike?id=${match.params.id}&dislike=${movie.video.dislike}&like=${movie.video.like}`, {
                credentials: 'include',
            })
            const data = await response.json()
            updateLikeDislike(data)
        } else {
            alert('Зарегистрируйтесь что бы добавить в избранное')
        }
    }

    dislikeFunc = async () => {
        if (getCookie('token')) {
            const { serverURL, match, movie, updateLikeDislike } = this.props
            const response = await fetch(`${serverURL}/addDislike?id=${match.params.id}&dislike=${movie.video.dislike}&like=${movie.video.like}`, {
                credentials: 'include',
            })
            const data = await response.json()
            updateLikeDislike(data)
        } else {
            alert('Зарегистрируйтесь')
        }
    }

    render() {
        return (
            <div>
                <MovieDescr {...this.props} likeFunc={this.likeFunc} dislikeFunc={this.dislikeFunc} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDescrContainer);