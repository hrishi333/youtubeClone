import React, {useCallback, useEffect, useMemo, useState} from "react";
import './VideoContent.css';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import {useSelector} from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {toast, ToastContainer} from "react-toastify";
import {
    dislikeOnVideoId,
    getUserById,
    likeOnVideoId,
    subscribeChannel,
    unsubscribeChannel
} from '../../Actions/userApi';
import {addViewOnVideo} from "../../Actions/videoApi";


const VideoContent = () => {
    const {currentVideo} = useSelector(state => state.video);
    const {currentUser} = useSelector(state => state.user);
    const [likedValue, setLikedValue] = useState(false);
    const [dislikedValue, setDislikedValue] = useState(false);
    const [subscribeValue, setSubscribeValue] = useState(false);
    const [channelData, setChannelData] = useState(null);

    const shareTextOptions = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }


    const checkLikeVideoState = () => {
        if (currentVideo) {
            const likeArray = currentVideo.data.data.likes;
            const prevLikeValue = likeArray.includes(currentUser.user._id); //check previously liked , returns true/false
            setLikedValue(prevLikeValue);
            if (dislikedValue === likedValue) {
                setDislikedValue(!dislikedValue);
            }
        }
    }

    const checkDislikeVideoState = () => {
        if (currentVideo) {
            const likeArray = currentVideo.data.data.dislikes;
            const prevLikeValue = likeArray.includes(currentUser.user._id); //checks previously disliked returns true / false
            setDislikedValue(prevLikeValue);
            if (dislikedValue === likedValue) {
                setDislikedValue(!dislikedValue);
            }
        }
    }

    const getChannelData = useCallback(async () => {
        const channel = await getUserById(currentVideo.data.data.userId._id);
        setChannelData(channel);
    }, [subscribeValue]);

    const checkSubscribeState = async () => {
        await getChannelData();
        if (channelData && channelData != null) {
            const subArray = channelData.data.subscribers;
            const prevSubscribed = subArray.includes(currentUser.user._id); // check previously subscribed returns true/false
            setSubscribeValue(prevSubscribed);
        } else {
            console.log('channelData is empty');
        }
    }

    const handleLike = async () => {
        const res = await likeOnVideoId(currentVideo.data.data._id, currentUser.token);
        if (res.status === 200) {
            setDislikedValue(likedValue); //inverse dislike value
            setLikedValue(!likedValue);
        }
    }

    const handleDislike = async () => {
        const res = await dislikeOnVideoId(currentVideo.data.data._id, currentUser.token);
        if (res.status === 200) {
            setLikedValue(dislikedValue); //inverse like value
            setDislikedValue(!dislikedValue);
        }
    }

    const handleSubscribe = async () => {
        const res = await subscribeChannel(currentVideo.data.data.userId._id, currentUser.token);
        if (res.status === 200) {
            setSubscribeValue(true);
            console.log(channelData);
        }
    }
    const handleUnsubscribe = async () => {
        const res = await unsubscribeChannel(currentVideo.data.data.userId._id, currentUser.token);
        if (res.status === 200) {
            setSubscribeValue(false);
            getChannelData();
            console.log(channelData);
        }
    }

    const handleShare = async () => {
        const currentURL = window.location.href;
        try {
            await navigator.clipboard.writeText(currentURL);
            toast.success('URL copied to clipboard!', shareTextOptions)
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    }

    const handleVideoPlay=async ()=>{
        const res = await addViewOnVideo(currentVideo.data.data._id);
        if(res.status===200){
            console.log('view added');
        }
    }

    useEffect(() => {
        checkLikeVideoState();
        checkDislikeVideoState();
        checkSubscribeState();
        handleVideoPlay();

    }, [currentVideo]);


    const likeButton = useMemo(() => {
        return (
            <div className='combine_button buttonOutline' style={{marginRight: "1rem"}}>
                <button className='likebutton'
                        onClick={handleLike}>
                    <ThumbUpTwoToneIcon color={likedValue === true ? "primary" : ""}
                                        style={{fontSize: 'inherit', marginRight: "5px"}}/>
                    {likedValue ? <span style={{color: "#1976d2"}}>Liked</span> : <span>Like</span>}
                </button>

                <button className='dislikebutton' onClick={handleDislike}>
                    <ThumbDownTwoToneIcon color={dislikedValue === true ? "primary" : ""}
                                          style={{fontSize: 'inherit'}}/>
                </button>
            </div>
        )
    }, [likedValue, dislikedValue]);


    const subscribeCount = useMemo(() => {
        getChannelData();
        return (
            <span>{ channelData?.data?.subscribers?.length } Subscribers</span>
        )
    }, [subscribeValue]);

    return (
        <>
            <div className='content_main'>
                <div className="video_container">
                    <iframe allowFullScreen
                            style={{margin: 0, padding: 0}}
                            src={currentVideo.data.data.videoUrl}/>
                </div>
                <p>{currentVideo.data.data.title}</p>
                <div className='channel_info'>
                    <div className='combine_button'>
                        <img src={currentVideo.data.data.userId.profile_image} alt='Channel'/>
                        <div className='channel_name_sub'>
                            <p>{currentVideo.data.data.userId.name}</p>
                            {subscribeCount}
                        </div>
                    </div>
                    <div className="combine_button common_mb ">
                        <button className='buttonOutline'>Join</button>
                        {
                            subscribeValue === false ?
                                <button className='buttonFill'
                                        onClick={handleSubscribe}>subscribe
                                </button> :
                                <button className='buttonOutline'
                                        style={{backgroundColor: "#272727"}}
                                        onClick={handleUnsubscribe}>subscribed<CheckCircleIcon
                                    style={{fontSize: "1rem", marginLeft: "4"}}/>
                                </button>

                        }

                        {likeButton} {/*like and dislike buttons are included into useMemo*/}

                        <button className='buttonOutline' onClick={handleShare}>Share<ReplyTwoToneIcon
                            style={{fontSize: 'inherit', marginLeft: '0.5rem'}}/>
                        </button>
                    </div>

                </div>
            </div>
            <ToastContainer/>

        </>
    )
}

export default VideoContent;