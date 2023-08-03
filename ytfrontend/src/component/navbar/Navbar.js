import React, {useCallback, useEffect, useState} from 'react'
import axios from "axios";
import {Link} from 'react-router-dom'
import {GoSearch} from "react-icons/go";
import {HiOutlineUser} from "react-icons/hi";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {useDispatch, useSelector} from "react-redux";
import {toggleOn, toggleOff, setToggle} from "../../redux/sidebarToggle";
import {setSearchValue} from "../../redux/searchSlice";
import {config} from "../../config/config";



const Navbar = () => {


    const baseUrl = config.API_URL;
    const isToggleOn = useSelector((state) => state.toggle);
    const dispatch = useDispatch();
    //  const [value,setValue]=useState(isToggleOn);
    const [searchTerm, setSearchTerm] = useState('');
    const screenWidth = window.innerWidth;


    const searchAPI = async (searchTerm) => {

        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(setSearchValue(searchTerm));
                resolve(`Search results for: ${searchTerm}`);
            }, 1000); // Simulate a 1-second delay for the API call
        });
    };

    useEffect(() => {
        const timerId = setTimeout(async () => {
            const results = await searchAPI(searchTerm);
            console.log(results);
        }, 3000);

        return () => clearTimeout(timerId);
    }, [searchTerm]);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    useEffect(() => {
        console.log(screenWidth, "screenwidth");
    }, [])

    return (
        <nav className="navbar">

            <div className={"icon_main"} style={{color: "#fff", margin: "0.5rem"}}>
                {(isToggleOn === true) ? <MenuOpenOutlinedIcon onClick={() => {
                    dispatch(toggleOff());
                }}/> : <MenuOutlinedIcon onClick={() => {
                    dispatch(toggleOn());
                }}/>}
                <div className="logo">
                    <img src="/assets/images/youtube.png" alt="YouTube Logo"/>
                    {(screenWidth >= 768) ? <p>YouTube</p> : <></>}
                </div>
            </div>


            {/*   search Input bar*/}
            <div className="search-bar">
                <input type="text" placeholder="Search" onChange={handleInputChange}/>
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