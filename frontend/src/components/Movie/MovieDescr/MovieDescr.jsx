import React from 'react'

export const MovieDescr = ({ movie, updateScore, complain }) => {

    const { video, category, tag, model, studio } = movie

    return (
        <div className="main-article-content-video-descr">
            <div className="main-article-content-video-descr-list">
                <div className="main-article-content-video-descr-list-name main-article-content-video-descr-list-padding">
                    <p>{video.name}</p>
                    <div className="">
                        Просмотров: {video.views}
                    </div>
                </div>
                <div className="">
                    <div className="">
                        <div className="main-article-content-video-descr-list-category main-article-content-video-descr-list-padding">
                            <p className="main-article-content-video-descr-list__item">
                                Категории:
                                {
                                    category.map((elem, i) => (<a href={`/category/${elem.id}`} key={i}><span>{elem.name}</span></a>))
                                }
                            </p>
                        </div>
                        <div className="main-article-content-video-descr-list-model main-article-content-video-descr-list-padding">
                            <p className="main-article-content-video-descr-list__item">
                                Модели:
                                {
                                    model.map((elem, i) => (<a href={`/model/${elem.id}`} key={i}><span>{elem.name}</span></a>))
                                }
                            </p>
                        </div>
                        <div className="main-article-content-video-descr-list-model main-article-content-video-descr-list-padding">
                            <p className="main-article-content-video-descr-list__item">
                                Студии:
                                {
                                    studio.map((elem, i) => (<a href={`/studio/${elem.id}`} key={i}><span>{elem.name}</span></a>))
                                }
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <button
                            onClick={() => updateScore('addLike')}
                            className="btn-like"
                        >
                            Like {video.like}
                        </button>
                        <button
                            onClick={() => updateScore('addDislike')}
                            className="btn-dislike"
                        >
                            Dislike {video.dislike}
                        </button>
                    </div>
                </div>
                <div className="main-article-content-video-descr-list-tag main-article-content-video-descr-list-padding">
                    <p>Тэги:
                        {
                            tag.map((elem, i) => (<a href={`/tag/${elem.id}`} key={i}><span>#{elem.name}</span></a>))
                        }
                    </p>
                </div>
                <button onClick={complain} className="btn-main">Пожаловаться</button>
            </div>
        </div>
    )
}