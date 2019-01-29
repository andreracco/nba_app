import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/Articles/News/Main/index';
import VideoMain from './components/Articles/Videos/Main/index';
import Layout from './hoc/Layout/layout';
import SignIn from './components/signin/signin';
import Dashboard from './components/Dashboard/dashboard';

const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/news" exact component={NewsMain} />
                <Route path="/videos/" exact component={VideoMain} />
                <Route path="/articles/:id" exact component={NewsArticle} />
                <Route path="/videos/:id" exact component={VideoArticle} />
                <Route path="/sign-in" exact component={SignIn} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        </Layout>
    );
}

export default Routes;