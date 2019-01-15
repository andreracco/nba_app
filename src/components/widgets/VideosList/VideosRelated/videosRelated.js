import React from 'react';
import style from '../videosList.module.css';
import VideoTemplate from '../videosListTemplate';

const videosRelated = (props) => {
    return (
        <div className={style.relatedWrapper}>
            <VideoTemplate
                data={props.data}
                teams={props.teams}
            />
        </div>
    );
};

export default videosRelated;