import React from 'react';

import moment from 'moment'


export const CommentList = ({ comments }) => {
    return (
        <div>
            {
                !!comments
                    ?
                    comments.map((elem, i) => {

                        const { createdAt, name, comment, answer, id, comment_id } = elem
                        return (
                            <div className="" key={i}>
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
                                        <p >Ответить</p>
                                        {
                                            answer === 1
                                                ?
                                                <p data-id={id}>Показать ответы</p>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <div className="comment-answer" id={`answer-${id}`} style={{ marginLeft: '50px' }}>
                                    {
                                        <CommentList comments={comments.filter((item) => item.comment_id === id)} />
                                    }
                                </div>
                            </div>
                        )

                    })
                    :
                    null
            }
        </div>
    )
}