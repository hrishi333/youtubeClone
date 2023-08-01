import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./view/Home";
import SignIn from "./view/Authentication/SignIn";
import SignUp from "./view/Authentication/SignUp";
import Navbar from "./component/navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";
import VideoPage from "./view/VideoPage/VideoPage";
import VideoPlayer from "./view/VideoPlayer/VideoPlayer";
import AddVideo from "./view/AddVideo/AddVideo";
import 'react-toastify/dist/ReactToastify.css';
import UserEdit from "./view/UserEdit/UserEdit";
import {ToastContainer} from "react-toastify";
import ChannelSub from "./view/ChannelsSub/ChannelSub";
import NotFound from "./view/NotFound";
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import ProtectedRoute from "./view/ProtectedRoute";

function App() {
    const {currentUser}= useSelector(state => state.user)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth =()=>{
        if(currentUser && currentUser?.user && currentUser?.token!=null){
            setIsAuthenticated(true);
            console.log("true log");
        }else{
            setIsAuthenticated(false);
        }
    }

    useEffect(()=>{
        checkAuth();
        console.log(isAuthenticated,"authentic");
        console.log(currentUser);
    },[])

    return (
        <div>
            <ToastContainer/>
            <Router>
                <Navbar/>
                <div className="container">
                    <Sidebar/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/signin' element={<SignIn/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/videopage' element={<VideoPage suffixUrl={"random"} />}/>
                        <Route path='/trending' element={<VideoPage suffixUrl={"trends"}/>}/>
                        <Route path='/player' element={<VideoPlayer/>}/>
                        <Route path='/addvideo' element={<AddVideo/>}/>

{/*
                        {isAuthenticated ? (<Route path="/userprofile" element={<UserEdit />} />) : (<Navigate to="/signin" />)}
*/}
                        <Route path='/userprofile' element={<UserEdit/>}/>
                        <Route path='/channels' element={<ChannelSub/>}/>
                        <Route path='*' element={<NotFound/>}/>


{/*
                        <ProtectedRoute  path="/userprofile" element={<UserEdit/>} isAuthenticated={isAuthenticated} />
*/}



                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
