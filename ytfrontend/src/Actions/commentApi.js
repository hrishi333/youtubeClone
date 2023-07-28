import axios from "axios";
import {config} from '../../src/config/config'


const baseUrl = config.API_URL;

/**
 * @Get_all_comments_by_video_id
 * Get Method
 * @Urlparam videoId
 *
 * @token
 */

export const getAllCommentsOnVideo = async (videoId, token) => {
    const requestConfig = {
        method: 'GET', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/comments/${videoId}`,
        // url: `${baseUrl}/comments/${videoId}`,
        headers: {'access_token':`${token}`},
        // Add other options like data, params, etc. based on your API needs
    };

    const res = await axios(requestConfig);
    return res;
}

/**
 * @Post_comment_on_video_id
 * Post Method
 * @Body_param videoId
 *
 * @token
 */
export const addComment = async (videoId, desc,token) => {
    console.log(videoId,desc,token);
    const res = await axios.post(`${baseUrl}/comments/`, {videoId, desc},{  headers: {'access_token':`${token}`}})
    return res;
}


/**
 * @Delete_comment_on_video_id
 * Delete Method
 * @URL_param videoId
 *
 * @token
 */

export const deleteComment = async (videoId,token)=>{
    const requestConfig = {
        method: 'DELETE', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/comments/${videoId}`,
        // url: `${baseUrl}/comments/${videoId}`,
        headers: {'access_token':`${token}`},
        // Add other options like data, params, etc. based on your API needs
    };
    const res = await axios(requestConfig);
    return res;
}