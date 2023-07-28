import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './userEdit.css'
import EditIcon from '@mui/icons-material/Edit';
import {editUserDetails, editUserProfile, getUserById} from "../../Actions/userApi";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import {loginSuccess} from "../../redux/userSlice";

const UserEdit = () => {
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    // const baseUrl = config.API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [nameInput, setNameInput] = useState(currentUser.user.name);
    const [imageInput, setImageInput] = useState(null);
    const [descInput, setDescInput] = useState(currentUser.user.about);

    const toastOptions = {
        type: "success",
        className: "toast-position",
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async () => {
        const data = new FormData();
        data.append("name", nameInput);
        data.append("about", descInput);
         const res = await editUserDetails(currentUser.user._id, data, currentUser.token);


         if (res.status === 200 && res.statusText) {
             toast("user updated successfully", toastOptions);
             console.log(res.data);
             //dispatch(loginSuccess(res.data));

         } else {
             toast.error("Something went wrong.",)
         }
    }

    const handleUploadImage = async () => {
        const imgData = new FormData();
        imgData.append("name", currentUser.user.name);
        imgData.append("profile_image", imageInput);
        const res = await editUserProfile(imgData, currentUser.token);
        console.log(res);
    }



    return (
        <>
            <div className="user_edit_main">
                <div className={"user_info"}>
                    <div className="image_container">
                        <img src={currentUser.user.profile_image} alt={"profile image"}/>
                        <div className="inputGroup">
                            <label htmlFor={"imageInput"}>Reset Image</label>
                            <input id={"imageInput"}
                                   type="file"
                                   name={"profile_image"}
                                   onChange={(e) => {
                                       let file = e.target.files[0];
                                       setImageInput(file);
                                   }}/>
                        </div>
                        <div className='inputGroup'>
                            {imageInput && <><p>Preview</p>
                                <img style={{marginBottom: "1rem"}} src={URL.createObjectURL(imageInput)}
                                     alt={'preview image'}/>
                                <button className="buttonFill" onClick={() => {
                                    handleUploadImage();
                                }}>Upload
                                </button>
                            </>}
                        </div>
                    </div>
                    <div className='info_container'>
                        <div className="inputGroup">
                            <label htmlFor="userChannelName">Channel Name&nbsp;
                                <EditIcon style={{width: "15px"}}/></label>
                            <input id='userChannelName'
                                   name={"name"}
                                   value={nameInput}
                                   onChange={(e) => {
                                       let updatedNameValue = e.target.value;
                                       setNameInput(updatedNameValue);
                                   }}

                            />
                        </div>
                        <div className="inputGroup">
                            <label htmlFor="userAboutInfo">About Channel&nbsp;
                                <EditIcon style={{width: "15px"}}/></label>
                            <textarea id='userAboutInfo'
                                      name={"about"}
                                      value={descInput}
                                      onChange={(e) => {
                                          let updatedDescValue = e.target.value;
                                          setDescInput(updatedDescValue);
                                      }}

                            />
                        </div>

                        <p>subscribers:{currentUser.user.subscribedUsers.length}</p>
                        <button className="buttonFill" onClick={async () => {
                            await handleSubmit();
                        }}>Save
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default UserEdit;