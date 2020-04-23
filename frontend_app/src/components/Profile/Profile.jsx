import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import ProfileLikeContainer from '../../containers/Profile/ProfileLikeContainer'
import ProfileUploadContainer from '../../containers/Profile/ProfileUploadContainer'
import ProfileMyVideoContainer from '../../containers/Profile/ProfileMyVideoContainer'

export const Profile = ({ serverURL }) => {
    return (
        <div className="profile">
            <Router>
                <div className="profile-header">
                    <h2 className="profile-header__name">Мой кабинет</h2>
                    <ul className="profile-header-list">
                        <li className="profile-header-list__item"><Link to={'/profile'}>Избранное</Link></li>
                        <li className="profile-header-list__item"><Link to={'/profile/myVideo'}>Мои видео</Link></li>
                        <li className="profile-header-list__item"><Link to={'/profile/upload'}>Загрузить видео</Link></li>
                    </ul>
                </div>

                <Switch>

                    <Route exact path="/profile/upload" render={
                        props => <ProfileUploadContainer {...props} serverURL={serverURL} />
                    } />

                    <Route exact path="/profile" render={
                        props => <ProfileLikeContainer  {...props} serverURL={serverURL} />
                    } />

                    <Route exact path="/profile/myVideo" render={
                        props => <ProfileMyVideoContainer  {...props} serverURL={serverURL} />
                    } />

                </Switch>

            </Router>
        </div>
    )
}