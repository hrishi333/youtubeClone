import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GoSearch} from "react-icons/go";
import {HiOutlineUser} from "react-icons/hi";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {useDispatch, useSelector} from "react-redux";
import {toggleOn, toggleOff, setToggle} from "../../redux/sidebarToggle";

const Navbar = () => {
    const isToggleOn = useSelector((state) => state.toggle);
    const dispatch = useDispatch();
  //  const [value,setValue]=useState(isToggleOn);
    const screenWidth = window.innerWidth;

    useEffect(()=>{
        console.log(screenWidth,"screenwidth");
    },[])

    return (
        <nav className="navbar">

            <div className={"icon_main"} style={{color:"#fff", margin:"0.5rem"}}>
                {(isToggleOn === true) ? <MenuOpenOutlinedIcon onClick={() => {
                    dispatch(toggleOff());
                }}/> : <MenuOutlinedIcon onClick={() => {
                    dispatch(toggleOn());
                }}/>}
                <div className="logo">
                    <img src="/assets/images/youtube.png" alt="YouTube Logo" />
                  { (screenWidth>=768)? <p>YouTube</p>:<></>}
                </div>
            </div>



            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button className="search-btn">
                    <i className=""><GoSearch/></i>
                </button>
            </div>

            <div className="user-profile">
                <Link><i className=''><HiOutlineUser/></i></Link>
            </div>
        </nav>
    )
}

export default Navbar;