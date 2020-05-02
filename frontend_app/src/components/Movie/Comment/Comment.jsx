
import React from 'react'
import { CommentList } from './CommentList'


export const Comment = (props) => {
    const { movie, addCommentSubmit } = props
    return (
        <div className="main-article-content-video-commented">
            <div className="main-article-content-video-commented-inp">
                <h3>Вы можете оставить свой комментарий</h3>
                <form onSubmit={addCommentSubmit} className="comment-form">
                    <div>
                        <textarea id="comment-comment" name="comment" className="inp-def inp-answer" placeholder="Комментарий"></textarea>
                    </div>
                    <button type="submit" className="btn-main" id="comment-btn">Отправить</button>
                </form>
            </div>
            <div className="main-article-content-video-commented-list scroll-style">
                <CommentList
                    comments={movie.comment}
                    {...props}
                />
            </div>
        </div>
    )
}