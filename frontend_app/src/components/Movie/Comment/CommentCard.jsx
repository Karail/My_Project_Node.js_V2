import React from 'react';
import moment from 'moment';
import CommentCardContainer from '../../../containers/Movie/Comment/CommentCardContainer';

export const CommentCard = ({ comments, elem, openAnswerList, openAnswerForm, closeAnswerForm, addAnswer, serverURL, match }) => {

    const { createdAt, name, comment, answer, id } = elem;

    const answers = comments.filter((item) => item.comment_id === id);

    return (

        <div className="comment-card">
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
                    <p data-id={id} onClick={openAnswerForm}>Ответить</p>
                    <div className="ansrer-container-form" id={`answer-form-${id}`}>
                        <form action="" onSubmit={addAnswer} data-id={id}>
                            <div>
                                <textarea type="text" placeholder="Ответ..." className="inp-def inp-answer" name="comment"></textarea>
                            </div>
                            <button type="button" className="btn-main" onClick={closeAnswerForm} data-id={id}>Отмена</button>
                            <button className="btn-main">Отправить</button>
                        </form>
                    </div>
                    {
                        answer
                            ?
                            <p data-id={id} onClick={openAnswerList}>Показать ответы</p>
                            :
                            null
                    }
                </div>
            </div>
            <div className="comment-answer-list" id={`answer-${id}`} style={{ marginLeft: '50px' }}>
                {
                    !!answers
                        ?
                        answers.map((elem, i) => {

                            const { comment_id } = elem

                            return (
                                comment_id
                                    ?
                                    <CommentCardContainer
                                        elem={elem}
                                        comments={comments}
                                        serverURL={serverURL}
                                        match={match}
                                        key={i}
                                    />
                                    :
                                    null
                            )

                        })
                        :
                        null
                }
            </div>
        </div>

    )
}