import React, {useEffect, useState} from "react";
import './channels.css';
import '../UserEdit/userEdit.css'
import {useSelector} from "react-redux";

const ChannelSub = () => {
    const [channelList,setChannelList]= useState(null);
    const {currentUser}=useSelector(state => state.user);

    const getChannelData =async ()=>{
        const subscription =0;
    };
    useEffect(()=>{
        console.log(currentUser);
        getChannelData();
    },[])

    return (
        <>
            <div className="user_edit_main">
               <p>Subscribed Channels</p>
                <div className="channel_list_container">
                    <div className="channel_profile">
                        <img src={"assets/images/JohnyDepp.jpeg"} alt={"channel profile"}/>
                        <p>Channel Name</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChannelSub;