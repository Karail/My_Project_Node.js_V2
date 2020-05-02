

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
  movie: itemsMovieType
}

class CommentContainer extends React.Component<PropsType> {

  addCommentSubmit = async (e: any) => {
    try {
      e.preventDefault()
      console.log(typeof e);
      if (!getCookie('token')) {
        alert('Войдите в систему')
      } else {
        e.preventDefault()

        const { serverURL, addComment, match } = this.props;

        const { dataset } = e.target

        const formData = new FormData(e.target)

        formData.append('video_id', match.params.id);

        if (dataset) {
          if (dataset.id) {
            formData.append('comment_id', dataset.id);
          }
        }

        const response = await fetch(`${serverURL}/addComment`, {
          method: 'post',
          credentials: 'include',
          body: formData
        })
        const data: itemsCommentType[] = await response.json();
        console.log(data);
        addComment(data)

      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <Comment
          addCommentSubmit={this.addCommentSubmit}
          {...this.props}
        />
      </div>
    )
  }
}

export default CommentContainer