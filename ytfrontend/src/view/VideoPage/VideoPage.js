import React, {useEffect, useState} from 'react';
import './VideoPage.css'
import Card from '../../component/Card/Card'
import axios from "axios";
import {config} from "../../config/config";
import {useSelector} from "react-redux";
import useSWR from 'swr'
const VideoPage = ({suffixUrl}) => {

    const [videoList,setVideoList]=useState(null);
    const baseUrl = config.API_URL;
    const currentSearch= useSelector(state => state.search);

    const fetcher = async (url) => {
        const response = await axios.get(url);
        setVideoList(response.data);
        return response.data;
    };

    const fetchVideos=async ()=>{
        const res = await axios.get(`${baseUrl}/videos/${suffixUrl}`,{withCredentials:true});
        console.log(res.data);
        setVideoList(res.data);
    }

    const { data, error } = useSWR(
        `${baseUrl}/videos/search?q=${currentSearch}`,
        fetcher
    );
    /*const searchApi = async ()=>{
        const res = await axios.get(`${baseUrl}/videos/search?q=${currentSearch}`).then((res) => {
            setVideoList(res.data);
            console.log( res.data);
        }).catch((e) => {
            console.log(e)
        });
    }*/

    useEffect(() => {
        if(currentSearch===''){
            fetchVideos();
        }else{
           // searchApi();
        }
    }, [suffixUrl,currentSearch])

    if(!data){
        return <div>Loading____.....</div>
    }
    if(error){
        return <div>Error:{error.message}</div>
    }
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