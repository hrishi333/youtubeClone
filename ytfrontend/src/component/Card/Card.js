import React, {useEffect, useState} from 'react';
import './Card.css'
import timesAgo from '../../reuseables/timesAgo';
import {getUserById} from "../../Actions/userApi";
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {fetchSuccess} from "../../redux/videoSlice";


const Card = (data) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const getTime = (time) => {
        return timesAgo(time);
    }



    useEffect(() => {
        setUserData(data.data.userId);
    }, [])

    return (
        <>
            <div className="video-card">
                <Link to={"/player"} onClick={()=>{
                    dispatch(fetchSuccess({data}));
                }} >
                    <div className="thumbnail">
                        <img src={data.data.imgUrl}></img>
                    </div>
                    <div className="details">
                        <div className='channel-profile'>
                         { userData && <img src={data.data.userId.profile_image} alt='Channel'/>}
                        </div>
                        <div className='channel-info'>
                            <h2 className="title">{data.data.title}</h2>
                            <p className="channel"> {data.data.userId.name}</p>
                            <p className="views">{data.data.views} Views • {getTime(data.data.createdAt)}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Card;