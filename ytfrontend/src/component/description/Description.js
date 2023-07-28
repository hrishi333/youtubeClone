import React, {useEffect, useState} from 'react';
import './Description.css'
import {useSelector} from "react-redux";
import timesAgo from "../../reuseables/timesAgo";

const Description = () => {

    const {currentVideo}= useSelector(state => state.video);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
        document.getElementById('showLessComponent').scrollIntoView({ behavior: 'smooth' });

    };
    const getTime = (time) => {
        return timesAgo(time);
    }
    useEffect(()=>{

    },[currentVideo]);

    return (
        <div className='description_main' id={"showLessComponent"}>

            <div className='ViewsTimeLine' >
                <p>{currentVideo.data.data.views} Views </p>
                <p> {getTime(currentVideo.data.data.createdAt)}</p>
            </div>
            <div className='description_section'>
                <p className={showFullDescription ? "description full" : "description"}>
                    <pre>
                    {currentVideo.data.data.desc}
                    </pre>
                </p>
                {!showFullDescription && (
                    <p className="show-more" onClick={()=>{
                        toggleDescription();
                    }}>
                        Show more
                    </p>
                )}
                {showFullDescription && (
                    <p className="show-more" onClick={()=>{
                        toggleDescription();
                    }}>
                        Show less
                    </p>
                )}
            </div>
        </div>
    )
}

export default Description;