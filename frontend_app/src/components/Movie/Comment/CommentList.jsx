import React from 'react';
import CommentCardContainer from '../../../containers/Movie/Comment/CommentCardContainer';

export const CommentList = ({ comments, serverURL, match }) => {

    return (
        <div>
            {
                !!comments
                    ?
                    comments.map((elem, i) => {

                        const { comment_id } = elem

                        return (
                            !comment_id
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
    )
}