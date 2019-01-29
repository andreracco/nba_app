import React, { Component } from 'react';
import style from '../../articles.module.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';
import { firebaseDB, firebaseTeams, firebaseVideos, firebaseLooper } from '../../../../firebase'

class VideoArticle extends Component {

    state = {
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    componentWillMount() {

        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
            .then( (snapshot) => {
                let article = snapshot.val();

                firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
                    .then( (snapshot) => {
                        const team = firebaseLooper(snapshot);

                        this.setState({
                            article,
                            team
                        })
                    });
            });

        this.getRelated();
    }

    getRelated = () => {

        firebaseTeams.once('value')
            .then( (snapshot) => {
                const teams = firebaseLooper(snapshot);

                firebaseVideos.orderByChild('team').equalTo(this.state.article.team).limitToFirst(3).once('value')
                    .then( (snapshot) => {
                        const related = firebaseLooper(snapshot);

                        this.setState({
                            teams,
                            related
                        })
                    })
            });

    }

    render() {

        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header teamData={team[0]} />
                <div className={style.video_wrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoPlayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >
                    </iframe>
                </div>
                <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
        );
    }  
};

export default VideoArticle;