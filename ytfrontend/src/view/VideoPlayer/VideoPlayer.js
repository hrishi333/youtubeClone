import React, {useEffect, useState} from "react";
import './VideoPlayer.css';
import VideoContent from "../../component/VideoContent/VideoContent";
import Description from "../../component/description/Description";
import Comment from "../../component/Comment/Comment";
import VideoList from "../../component/Videolist/VideoList";
import {TailSpin} from "react-loader-spinner";
//import {useSelector} from "react-redux";

const VideoPlayer = () => {
    // const {currentVideo}= useSelector(state => state.video);
    const [showLoader, setShowLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
        }, 3000);
    })

    return (
        <div className='playerpage_main'>
            {showLoader ? <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"100%",width:'100%'}}><TailSpin
                height="80"
                width="80"
                color="#ff1616"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div> : <>
                <div className='videoplayerpart'>
                    <VideoContent/>
                    <Description/>
                    <Comment/>
                </div>
                <div className='videolistpart'>
                    <VideoList/>
                </div>
            </>}

        </div>
    );
};

export default VideoPlayer;