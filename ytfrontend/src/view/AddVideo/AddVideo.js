import React, {useEffect, useState} from 'react';
import './addvideo.css'
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {config} from "../../config/config";
import Cookies from 'universal-cookie';


const AddVideo = () => {

    const cookies = new Cookies();

    const navigate = useNavigate();
    const baseUrl = config.API_URL;
    const {currentUser} = useSelector(state => state.user);
    const userId = currentUser.user._id;
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const accessToken = currentUser.token;

    const beingProcessedVideoOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const anErrorOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (!currentUser && currentUser === null) {
            navigate('/')
        }

        console.log(userId);
    }, [currentUser]);

    const send = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("image", image);
        data.append("file", file);

        /*   data.forEach((value, key) => {
               console.log(key, value);
           });
         */
        if(title && image && file ){
            const res = await axios.post(`${baseUrl}/videos`, data,
                {
                    headers: {
                        ' Content-Type': 'multipart/form-data',
                        'access_token': `${accessToken}` // Set the cookie here
                    }
                }
            );
            if (res.status === 200 && res.statusText) {

                toast.info("Video is uploaded  successfully", beingProcessedVideoOptions);
                setTimeout(() => {
                    navigate('/videopage');
                }, 3000)
                console.log(res);

            } else {
                toast.error("Something went wrong.", anErrorOptions)
            }

        }else{
            toast.error('plese fill all required data',{theme:"dark",position:"top-center"});
        }

    }


    return (
        <div className='addVideo_main'>
            <div className='addVideo_card'>
                <h1>Upload Video</h1>
                <div>
                    <div className='inputGroup'>
                        <label htmlFor="name">Title</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => {
                                let file = e.target.files[0];
                                setImage(file);
                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                            }}
                            required
                        />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="video">Video</label>
                        <input
                            type="file"
                            id="video"
                            accept="video/*"
                            onChange={(e) => {
                                let file = e.target.files[0];
                                setFile(file);
                                setVideoPreview(URL.createObjectURL(e.target.files[0]));
                            }}
                            required
                        />
                    </div>
                    <div className="preview_section">
                        <div className='image_preview'>
                            Thumbnail (prefer 16:9 size)
                            {imagePreview && (
                                <img src={imagePreview}/>
                            )
                            }
                        </div>
                        <div className='video_preview'>
                            Video Preview
                            {videoPreview && (
                                <video controls>
                                    <source src={videoPreview} type="video/mp4"/>
                                </video>

                            )
                            }

                        </div>
                    </div>
                    <button onClick={send}>Add Video</button>
                </div>

            </div>

            <ToastContainer/>

        </div>
    );
};

export default AddVideo;