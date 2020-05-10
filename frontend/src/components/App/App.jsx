import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HeaderContainer from '../../containers/Header/HeaderContainer'
import { Footer } from '../Footer/Footer'

import ModelListContainer from '../../containers/ModelListContainer'

import VideoListContainer from '../../containers/VideoListContainer'

import MovieContainer from '../../containers/Movie/MovieContainer'

import ProfileContainer from '../../containers/Profile/ProfileContainer'

import ResetPasswordContainer from '../../containers/ResetPasswordContainer'


class App extends React.Component {
   render() {
      const limit = 12
      const serverURL = 'http://localhost:8080'
      return (
         <div>
            <Router>
               <HeaderContainer serverURL={serverURL} />
               <div className="main-page">
                  <div className="main">
                     <Switch>
                        <Route exact path="/" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={''}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />
                        <Route exact path="/category/:id" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={'category/'}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />
                        <Route exact path="/model/:id" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={'model/'}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />
                        <Route exact path="/studio/:id" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={'studio/'}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />
                        <Route exact path="/tag/:id" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={'tag/'}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />

                        <Route exact path="/search/:id" render={
                           props => (
                              <VideoListContainer
                                 serverURL={serverURL}
                                 tableName={'search/'}
                                 limit={limit}
                                 {...props}
                              />
                           )
                        } />

                        <Route exact path="/category" render={
                           props => (
                              <ModelListContainer
                                 serverURL={serverURL}
                                 {...props}
                                 tableName={'category'}
                              />
                           )
                        } />

                        <Route exact path="/model" render={
                           props => (
                              <ModelListContainer
                                 serverURL={serverURL}
                                 {...props}
                                 tableName={'model'}
                                 modifier={'model-content__item'}
                              />
                           )
                        } />

                        <Route exact path="/studio" render={
                           props => (
                              <ModelListContainer
                                 serverURL={serverURL}
                                 {...props}
                                 tableName={'studio'}
                              />
                           )
                        } />

                        <Route exact path="/movie/:id" render={
                           props => <MovieContainer serverURL={serverURL} {...props} />
                        } />

                        <Route exact path="/profile" render={
                           props => <ProfileContainer serverURL={serverURL} limit={limit} {...props} />
                        } />

                        <Route exact path="/profile/upload" render={
                           props => <ProfileContainer serverURL={serverURL} limit={limit} {...props} />
                        } />

                        <Route exact path="/profile/myVideo" render={
                           props => <ProfileContainer serverURL={serverURL} limit={limit} {...props} />
                        } />

                        <Route exact path="/newPassword/:token" render={
                           props => <ResetPasswordContainer serverURL={serverURL} {...props} />
                        } />

                        <Route exact path="/profile/edit/:id" render={
                              props => <ProfileContainer serverURL={serverURL} limit={limit} {...props} />
                        } />

                     </Switch>
                  </div>
               </div>
               <Footer />
            </Router>
         </div>
      )
   }
}

export default App

