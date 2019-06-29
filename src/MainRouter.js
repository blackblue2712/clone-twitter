
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
// import CoverImage from './components/CoverImage';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import EditPost from './post/EditPost';
import SinglePost from './post/SinglePost';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
const MainRouter = () => (
    <div className="App">
        <Menu />
        {/* <CoverImage /> */}
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/forgot-password" component={ForgotPassword}></Route>
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}></Route>

            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/user/edit/:userId" component={EditProfile}></Route>

            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <Route exact path="/post/edit/:postId" component={EditPost}></Route>
        </Switch>
    </div>
)
    


export default MainRouter;
