
import React from 'react';

import { CommentCard } from '../../../components/Movie/Comment/CommentCard';
import { itemsCommentType } from '../../../type/comment.type';
import { getCookie } from '../../../func/cookie';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as movieActions from '../../../redux/list/movie/movie.action'
import { rootReducerType } from '../../../redux/list'

import { addCommentType } from '../../../redux/list/movie/movie.type';
import { match } from "react-router";

type PropsType = {
    comments: itemsCommentType[]
    elem: itemsCommentType
    serverURL: string
    match: match<{ id: string }>
    addComment: (data: itemsCommentType[]) => addCommentType
    addCommentSubmit: any
}

class CommentCardContainer extends React.Component<PropsType>  {

    componentDidMount() {
        let answerForm = document.querySelectorAll('.ansrer-container-form') as any;
        answerForm.forEach((el: HTMLElement) => {
            el.style.display = 'none';
        })
        let answerList = document.querySelectorAll('.comment-answer-list') as any;
        answerList.forEach((el: HTMLElement) => {
            el.style.display = 'none';
        })
    }

    openAnswerForm = (e: any) => {
        let answerForm = document.querySelector('#answer-form-' + e.target.dataset.id) as HTMLElement;
        answerForm.style.display = 'block';

    }
    closeAnswerForm = (e: any) => {
        let answerForm = document.querySelector('#answer-form-' + e.target.dataset.id) as HTMLElement;
        answerForm.style.display = 'none';
    }

    openAnswerList = (e: any) => {
        let answerList = document.querySelector('#answer-' + e.target.dataset.id) as HTMLElement;

        if (answerList.style.display == 'none') {
            answerList.style.display = 'block'
        } else {
            answerList.style.display = 'none'
        }
    }

    render() {
        const { comments, elem, serverURL, match, addCommentSubmit } = this.props;
        return (
            <CommentCard
                comments={comments}
                elem={elem}
                openAnswerList={this.openAnswerList}
                openAnswerForm={this.openAnswerForm}
                closeAnswerForm={this.closeAnswerForm}
                addCommentSubmit={addCommentSubmit}
                serverURL={serverURL}
                match={match}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentCardContainer);