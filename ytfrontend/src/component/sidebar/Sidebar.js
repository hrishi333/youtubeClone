import React, {useEffect, useState} from "react";
import './sidebar.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/userSlice";
import {useSelector} from "react-redux";
import {getUserById} from "../../Actions/userApi";


const Sidebar = () => {

    const {currentUser} = useSelector(state => state.user);
    const isToggleOn = useSelector((state) => state.toggle);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [width, setWidth] = useState(false);

    // const [toggle, setToggle] = useState(false);

    function logoutUser() {
        dispatch(logout());
        navigate('/signin');
    }

    /*   const userData =async ()=>{
           const res = await getUserById(currentUser.user._id);
           console.log(res);
       }*/

    useEffect(() => {
        const a = window.innerWidth;
        console.log(a);
        if (a <= 600) {
            setWidth(true);
        } else {
            setWidth(false);
        }
        //userData();
    }, []);


    return (
        <>

            <div
                className={(isToggleOn === true) ? 'display_toggle_on sidebar_main' : 'display_toggle_off sidebar_main'}
                style={(isToggleOn === false && width === true) ? {position: "absolute"} : {position: ""}}>

                {/*<div className={""}>
                    {(width === true) ? <MenuOpenOutlinedIcon onClick={() => {
                        setToggle(!toggle);
                    }}/> : <MenuOutlinedIcon onClick={() => {
                        setToggle(!toggle);
                    }}/>}
                </div>*/}

                <div className='sidebarMenuItem' onClick={() => {
                    navigate("/userprofile")
                }}>
                    <i>{
                        currentUser && currentUser.user.profile_image ? <img src={currentUser.user.profile_image}
                                                                             style={{
                                                                                 fontSize: '1.5rem',
                                                                                 width: "30px",
                                                                                 borderRadius: "10px"
                                                                             }} className="MUIIcon"/>
                            : <AccountCircleOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/>
                    }
                    </i>
                    {currentUser ? currentUser.user.name : "User"}
                </div>
                <hr className="hrLine"/>
                <Link to='/videopage'>
                    <div className='sidebarMenuItem' style={{marginTop: "5px"}}>
                        <i>< HomeOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                        Home
                    </div>
                </Link>
                <div className='sidebarMenuItem'>
                    <i>< ExploreOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Explore
                </div>
                <Link to='/trending'>
                    <div className='sidebarMenuItem'>
                        <i>< LocalFireDepartmentIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                        Trending
                    </div>
                </Link>

                <div className='sidebarMenuItem'>
                    <i>< MovieFilterOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Shorts
                </div>
                <Link to={"/channels"}>
                    <div className='sidebarMenuItem'>
                        <i>< SubscriptionsOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                        Subscriptions
                    </div>
                </Link>
                <hr className="hrLine"/>
                <div className='sidebarMenuItem' style={{marginTop: "5px"}}>
                    <i>< LibraryBooksOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Books
                </div>
                <div className='sidebarMenuItem'>
                    <i>< RestoreOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    History
                </div>
                <hr className="hrLine"/>
                <Link to={"/addvideo"}>
                    <div className='addVideoButton' style={{marginTop: "5px"}}>
                        <i><VideoCallOutlinedIcon className='addVideoIcon'
                                                  style={{fontSize: '1.5rem'}}
                        /></i>
                        Add Video
                    </div>
                </Link>
                <div className='sidebarMenuItem' style={{marginTop: "5px"}}>
                    <i>< MusicNoteOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Music
                </div>
                <div className='sidebarMenuItem'>
                    <i>< SportsVolleyballOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    sports
                </div>
                <div className='sidebarMenuItem'>
                    <i>< SportsEsportsOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Games
                </div>
                <div className='sidebarMenuItem'>
                    <i>< LiveTvOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Live
                </div>
                <hr className="hrLine"/>
                <div className='sidebarMenuItem' style={{marginTop: "5px"}}>
                    <i>< AddCircleOutlineOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/></i>
                    Look at channel
                </div>

                <div className='sidebarMenuItem' onClick={() => {
                    logoutUser();
                }}>
                    <i>
                        <LogoutOutlinedIcon style={{fontSize: '1.5rem'}} className="MUIIcon"/>
                    </i>
                    LogOut
                </div>
                <hr className="hrLine"/>
                <div className='youtubeMoreBottom'>
                    <p>More from YouTube</p>
                    <div className='youtubeMoreOption'>
                        <img src='/assets/images/youtube.png' alt={'youtube_icon'}></img>
                        YouTube Premium
                    </div>
                    <div className='youtubeMoreOption'>
                        <img src='/assets/images/youtube.png' alt={'youtube_icon'}></img>
                        YouTube Music
                    </div>
                    <div className='youtubeMoreOption'>
                        <img src='/assets/images/youtube.png' alt={'youtube_icon'}></img>
                        YouTube Kids
                    </div>
                </div>
            </div>

        </>
    )
};

export default Sidebar;