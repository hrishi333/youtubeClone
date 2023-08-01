import React, {useEffect, useState} from 'react';
import './Comment.css'
import axios from "axios";
import {config} from "../../config/config";
import {useSelector} from "react-redux";
import {addComment, getAllCommentsOnVideo, deleteComment} from "../../Actions/commentApi";
import timesAgo from "../../reuseables/timesAgo";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {toast} from "react-toastify";
import Modal from "../Modal/Modal";

const Comment = () => {
    const {currentUser} = useSelector(state => state.user);
    const {currentVideo} = useSelector(state => state.video);
    const [commentText, setCommentText] = useState(null);
    const [commentsList, setCommetsList] = useState();
    const [refresh, setRefresh] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const objContent = {content: 'Are you sure! You want delete comment?', button1: 'Cancel', button2: 'Delete'}
    const getComments = async () => {
        const res = await getAllCommentsOnVideo(currentVideo.data.data._id, currentUser.token);
        let newListData = res.data.slice().reverse(); //Reverse list of comment for showing lattest comment upside

        setCommetsList(newListData);
    }

    const submitComment = async () => {
        const res = await addComment(currentVideo.data.data._id, commentText, currentUser.token);
        console.log(res);
        if (res.status === 200) {
            setRefresh(!refresh);
            setCommentText('');
            toast("Comment submitted !", {position: "top-center", theme: 'dark', type: 'success'})
        }
    }

    const toggleShowMore = () => {
        setShowMore(!showMore);
       // document.getElementById('showMoreLess').classList.add("contentDiv");
    }

    const handleCancelModal = () => {
        setShowDeleteModal(false);
    };

    const handleOnDelete = (commentId) => {
        const res = deleteComment(commentId, currentUser.token);
        console.log(res);
        if (res.status === 200) {
            toast('Comment Deleted!', {position: "top-center", theme: 'dark', type: "warning"})
        }
    }

    const deleteButton = () => {
        return (
            <DeleteOutlineIcon className={"deleteButton"}
                               onClick={() => {
                                   setShowDeleteModal(true);
                                   console.log(showDeleteModal);
                               }}/>
        )
    }


    useEffect(() => {
        getComments();

    }, [refresh,currentUser])

    return (

        <div className='Comment_main' style={{}}>
            <p>2249 Comments</p>
            <div className='comment_input'>
                <img src={currentUser.user.profile_image} alt='Channel'/>
                <div className='comment_input_field'>
                    <textarea placeholder='write comment...'
                              onChange={(e) => {
                                  e.preventDefault();
                                  setCommentText(e.target.value);
                              }}/>
                    <hr className='hrLine'/>
                    <div className='button_group'>
                        <button className='btnSecondary'>Cancel</button>
                        <button className='btnSecondary' onClick={() => {
                            submitComment();
                        }}>Comment
                        </button>
                    </div>
                </div>
            </div>

            {commentsList?.filter((item, index) => (showMore===false) ? index <= 4 : index).map((item, index) => (
                <div key={item._id} className='all_comments' id={'showMoreLess'}>

                    <img src={item.userId.profile_image} alt='Channel'/>
                    <div className='comments_group'>
                        <p className='user_name'>{item.userId.name}
                            <span className='comment_time'>{timesAgo(item.createdAt)}</span>
                            {item.userId._id === currentUser.user._id ? deleteButton() : ''}
                        </p>
                        {
                            showDeleteModal &&
                            <Modal onDelete={handleOnDelete} onCancel={handleCancelModal} data={objContent}
                                   commentId={item._id}/>
                        }
                        <p className='user_comment'>{item.desc}</p>
                    </div>
                </div>
            ))}
            <p style={{display: "flex", alignItems: 'center'}} onClick={() => toggleShowMore()}>Show &nbsp;
                <span>{showMore ? "All" : "less"}</span>
                {showMore ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
            </p>
            <hr style={{marginBottom: "1rem"}} className='hrLine'/>

        </div>
    )
}

export default Comment;