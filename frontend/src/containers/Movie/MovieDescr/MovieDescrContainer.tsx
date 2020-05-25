import React from 'react'

import { MovieDescr } from '../../../components/Movie/MovieDescr/MovieDescr'
import { getCookie } from '../../../func/cookie'

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as movieActions from '../../../redux/list/movie/movie.action'

import { updateLikeDislikeType } from '../../../redux/list/movie/movie.type'
import { likeDislikeType } from '../../../type/movie.type';

import { rootReducerType } from '../../../redux/list'
import { itemsMovieType } from '../../../type/movie.type'

import { match } from "react-router";

type PropsType = {
    serverURL: string,
    match: match<{ id: string }>,
    movie: itemsMovieType,
    updateLikeDislike: (data: likeDislikeType) => updateLikeDislikeType
}

class MovieDescrContainer extends React.Component<PropsType> {

    updateScore = async (method: string) => {
        if (getCookie('token')) {
            const { serverURL, match, movie, updateLikeDislike } = this.props
            const response = await fetch(`${serverURL}/${method}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    id: match.params.id,
                    dislike: movie.video.dislike,
                    like: movie.video.like,
                }),
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
                <MovieDescr
                    {...this.props}
                    updateScore={this.updateScore}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDescrContainer);