import React from 'react'
import moment from 'moment'

export const CommentCard = (props) => {

    const { createdAt, name, comment, answer, id, showAnswer, addAnswer, comment_id } = props

    return (
        <div className="">
            <div className="main-article-content-video-commented-list__item">
                <p className="main-article-content-video-commented-list__item__date">
                    {moment(createdAt).format('YYYY-MM-DD hh:mm')}
                </p>
                <p className="main-article-content-video-commented-list__item__name">
                    {name}
                </p>
                <p className="main-article-content-video-commented-list__item__text">
                    {comment}
                </p>
                <div>
                    <p onClick={addAnswer}>Ответить</p>
                    {
                        !!answer
                            ?
                            <p onClick={showAnswer} data-id={id}>Показать ответы</p>
                            :
                            <p></p>
                    }
                </div>
            </div>
            <div className="comment-answer" id={`answer-${id}`}>
            </div>
        </div>
    )
}