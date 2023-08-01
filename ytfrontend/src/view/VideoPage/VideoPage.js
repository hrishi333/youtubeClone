import React, {useEffect, useState} from 'react';
import './VideoPage.css'
import Card from '../../component/Card/Card'
import axios from "axios";
import {config} from "../../config/config";

const VideoPage = ({suffixUrl}) => {

    const [videoList,setVideoList]=useState(null);
    const baseUrl = config.API_URL;
    const fetchVideos=async ()=>{
        const res = await axios.get(`${baseUrl}/videos/${suffixUrl}`,{withCredentials:true});
        console.log(res.data);
        setVideoList(res.data);
    }

    useEffect(() => {
        fetchVideos();
    }, [suffixUrl])
    return (
        <>
            <div className='main_page'>
                <div className='grid_container'>
                    <div className='grid_item'>
                        {videoList && (
                            videoList.map((data,index)=>(
                                <Card key={data._id} data={data}/>
                            ))

                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default VideoPage;