

import React from 'react'

import { Comment } from '../../../components/Movie/Comment/Comment'
import { getCookie } from '../../../func/cookie'

import { addCommentType } from '../../../redux/list/movie/movie.type'
import { itemsCommentType } from '../../../type/comment.type'
import { itemsMovieType } from '../../../type/movie.type'

import { match } from "react-router";

type PropsType = {
  serverURL: string
  match: match<{ id: string }>
  addComment: (data: itemsCommentType[]) => addCommentType
  movie: itemsMovieType,
}

class CommentContainer extends React.Component<PropsType> {

  addCommentForm = async (e: any) => {
    try {
      e.preventDefault()

      if (!getCookie('token')) {
        alert('Войдите в систему')
      } else {
        const { serverURL, match, addComment } = this.props;
        const video_id = match.params.id

        const formData = new FormData(e.target)
        formData.append('video_id', video_id)

        const response = await fetch(`${serverURL}/addComment`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        const data = await response.json()
        console.log(data)
        addComment(data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  addAnswer = async () => {

  }

  showAnswer = (e: any) => {

    const { comment } = this.props.movie

    comment.forEach((el) => {
      if (el.comment_id == e.target.dataset.id) {

      }
    })

  }

  render() {
    return (
      <div>
        <Comment addCommentForm={this.addCommentForm} {...this.props} showAnswer={this.showAnswer} addAnswer={this.addAnswer} />
      </div>
    )
  }
}

export default CommentContainer