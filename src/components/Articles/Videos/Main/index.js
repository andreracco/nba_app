import React from 'react';
import VideosList from '../../../widgets/VideosList/videosList';

const VideosMain = () => {
    return (
        <div>
             <VideosList
                type="card"
                tittle={false}
                loadMore={true}
                start={0}
                amount={6}
            />
        </div>
    );
};

export default VideosMain;