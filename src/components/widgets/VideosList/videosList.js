import React, { Component } from 'react';
import style from './videosList.module.css';
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase';
import Button from '../Button/button';
import VideosListTemplate from './videosListTemplate';

class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {

        if (this.state.teams.length < 1 ) {
            firebaseTeams.once('value')
                .then( (snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then( (snapshot) => {
                const videos = firebaseLooper(snapshot);

                this.setState({
                    videos:[...this.state.videos, ...videos],
                    start,
                    end
                })
            })
            .catch( e => {
                console.log(e);
            })
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)

    }

    renderVideos = () => {
        let template = null;

        switch(this.props.type) {
            case('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams} />
                break;
            default:
                template = null;
        }

        return template;

    }

    renderButton = () => {
        return this.props.loadMore ?
            <Button type="loadMore" loadMore={() => this.loadMore()} cta="Load More Videos" />
            :
            <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    }

    renderTittle = () => {
        return this.props.tittle ? 
            <h3> <strong> NBA </strong> Videos </h3>
        : null
    }

    render() {
        return (
            <div className={style.videoList_wrapper}>
                {this.renderTittle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;