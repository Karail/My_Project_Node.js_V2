
import React from 'react'
import { CommentList } from './CommentList'


export const Comment = ({ movie, addCommentForm, showAnswer, addAnswer }) => {
    return (
        <div className="main-article-content-video-commented">
            <div className="main-article-content-video-commented-inp">
                <h3>Вы можете оставить свой комментарий</h3>
                <form onSubmit={addCommentForm} className="comment-form">
                    <div>
                        <textarea id="comment-comment" name="comment" className="main-article-content-video-commented-inp__text" placeholder="Комментарий"></textarea>
                    </div>
                    <button type="submit" className="btn-main" id="comment-btn">Отправить</button>
                </form>
            </div>
            <div className="main-article-content-video-commented-list scroll-style">
                <CommentList comments={movie.comment}/>
            </div>
        </div>
    )
}