import React, {useEffect, useState} from 'react';
import './videolist.css';
import axios from "axios";
import {config} from "../../config/config";
import timesAgo from "../../reuseables/timesAgo";
import {getUserById} from "../../Actions/userApi";
import {useDispatch} from "react-redux";
import {fetchSuccess} from "../../redux/videoSlice";


const VideoList = (props) => {
    const baseUrl = config.API_URL;
    const dispatch = useDispatch();
    const [videoList, setVideoList] = useState(null);
    const [userData, setUserData] = useState(null);

    /*    const getUserByUserId = async (userId) => {
            const user = await getUserById(userId);
            setUserData(user);
            return user.data.name;
        }*/

    const fetchVideos = async () => {
        const res = await axios.get(`${baseUrl}/videos/random`, {withCredentials: true});
        console.log(res.data);
        setVideoList(res.data);
    }


    useEffect(() => {
        fetchVideos();
    }, [])


    return (
        <div className='videolist_main'>
            {videoList && videoList.map((data, index) => {
                    return (
                        <div key={data._id} className='videolist_card' onClick={() => {

                            dispatch(fetchSuccess({data: {data}}));
                            props.toggleRefresh();

                        }}>
                            <div className={"imageCard"}>
                                <img src={data.imgUrl}/>
                            </div>
                            <div className='videoDetails'>
                                <p className='videoTitle'>{data.title}</p>
                                <p className='videoChannel'>{data.userId.name}</p>
                                <p className="views">{data.views} Views • {timesAgo(data.createdAt)}</p>
                            </div>
                        </div>
                    )
                }
            )}

        </div>
    )
}

export default VideoList;