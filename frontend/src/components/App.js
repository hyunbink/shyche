import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from '../main/main_page';
import LoginFormContainer from './session/login_container';
import SignupFormContainer from './session/signup_container';
import UserPageContainer from './user_page/user_page_container';


const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
        <Route exact path="/user/:id" component={ UserPageContainer}/>
        {/* Change this to the categories page later */}
        <Route exact path="/category/:category" component={ MainPage }/> 
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;
