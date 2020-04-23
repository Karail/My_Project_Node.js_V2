import React from 'react'

import MovieDescrContainer from '../../containers/Movie/MovieDescr/MovieDescrContainer'
import CommentContainer from '../../containers/Movie/Comment/CommentContainer'

import "../../../node_modules/video-react/dist/video-react.css"
import { Player, BigPlayButton } from 'video-react';
// import HLSSource from '../../Hls/HLSSource';

export const Movie = (props) => {
  return (
    <div className="main-page">
      <div className="main-article">
        <div className="main-article-content">
          <div className="main-article-content-video">
            <div className="main-article-content-video-item" >

              <Player
                playsInline
                width='100%'
                height='100%'
                fluid={false}
                src={props.movie.video.url}
              >
                {/* <HLSSource
                  isVideoChild
                  src={props.movie.video.url}
                /> */}
                <BigPlayButton position="center" />
              </Player>

            </div>
            <MovieDescrContainer {...props} />
            <CommentContainer {...props} />
          </div>
          <div className="main-article-content-recomented">
            {/* {{#each recommended}}
                        <a href="/article?id={{this.id}}">
                            <div className="main-content__item" style="background-image: url({{this.img}});background-size: cover;">
                                <div className="main-content__item__descr">
                                    <p>{{this.name}}</p>
                                </div>
                            </div>
                        </a>
                    {{/each}} */}
          </div>
        </div>
      </div>
    </div>
  )
}
// '//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'