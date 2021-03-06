import React from 'react';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';
import UserPageContainer from './user_page/user_page_container';
import VideoForm from './video/video_form/video_form_container';
import ProfAuthFormContainer from './prof_auth/prof_auth_container';
import TopicPageContainer from './topics/topic_page_container';
import VideoShowPageContainer from './video/video_show/video_show_page_container';
import SearchResultsContainer from './searchbar/search_results_container';
import IconsBackground from './icons_background/icons_background';
// import LiveChat from '../components/live-chat/live-chat';
import "../App.css";
import HomePage from '../home/home_page';
import LandingPage from './landing_page/landing_page';
import SideBar from './sidebar/sidebar';
import Footer from './footer/footer';
import "./static_pages.scss";
import LiveChatContainer from './live-chat/live_chat_container';

const App = () => (
    <div className='page'>
      <NavBarContainer />
      <div className='body stretch' id="body">
        <SideBar />
        <Switch>
          <Route exac path="/search" component={ SearchResultsContainer }/>
          <Route exact path="/background" component={ IconsBackground } />
          <Route exact path="/auth/:id" component={ ProfAuthFormContainer } />
          <ProtectedRoute exact path="/user/:id" component={ UserPageContainer}/>
          <Route exact path="/topic/:topic" component={ TopicPageContainer }/> 
          {/* <Route exact path="/category/:category" component={ CategoryPageContainer }/>  */}
          <Route exact path="/video/upload" component={ VideoForm }/>
          <Route exact path="/video/:videoId" component={ VideoShowPageContainer }/>
          <Route exact path="/video/edit/:videoId" component={ VideoForm }/>
          <AuthRoute exact path="/login" component={LoginFormContainer} />
          <AuthRoute exact path="/signup" component={SignupFormContainer} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <AuthRoute exact path="/" component={LandingPage} />
        </Switch>
        <LiveChatContainer />
      </div>
      <Footer />
    </div>
);

export default App;
