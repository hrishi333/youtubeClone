import axios from "axios";
import {config} from '../../src/config/config'


const baseUrl = config.API_URL;


export const getUserById = async (userId) => {
    const res = await axios.get(`${baseUrl}/users/find/${userId}`);
    return res;
}

/**
 * @Update Uer Details Name
 * Put Method
 * @Urlparam userId
 * @bodyparm name
 * @token
 */

export const editUserDetails = async (userId, data, token) => {


    const res = await axios.put(`${baseUrl}/users/${userId}`, data, {
        headers: {
            ' Content-Type': 'application/json',
            'access_token': `${token}`,
        }
    });
    //const res =await axios(requestConfig);
    return res;
}

/**
 * @Update Uer profile image with name
 * Post Method
 * @Urlparam userId
 * @bodyparm Image, name
 * @token
 */

export const editUserProfile = async (data, token) => {
    try {
        const res = await axios.post(`${baseUrl}/users/uploadProfileImage`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'access_token': `${token}`,
            }
        });
        return res;
    } catch (e) {
        console.log('error', e)
    }

}


/**
 * @Like on Video Id
 * Put Method
 * @Urlparam videoId
 * @bodyparm userId
 * @token
 */

export const likeOnVideoId = async (videoId, token) => {
    // Your request configuration
    const requestConfig = {
        method: 'PUT', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/users/like/${videoId}`,
        headers: {'access_token': `${token}`},
        // Add other options like data, params, etc. based on your API needs
    };
    try {
        const res = await axios(requestConfig);
        return res;
    } catch (e) {
        console.log('error', e)
    }

}
/**
 * @Dislike on Video Id
 * Put Method
 * @Urlparam videoId
 * @bodyparm userId
 * @token
 */
export const dislikeOnVideoId = async (videoId, token) => {
    // Your request configuration
    const requestConfig = {
        method: 'PUT', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/users/dislike/${videoId}`,
        headers: {'access_token': `${token}`},
        // Add other options like data, params, etc. based on your API needs
    };

    try {
        const res = await axios(requestConfig);
        return res;
    } catch (e) {
        console.log('error', e)
    }
}

/**
 * @Subscribe on userId
 * Put Method
 * @Urlparam userId
 *
 * @token
 */

export const subscribeChannel = async (userId, token) => {
    const requestConfig = {
        method: 'PUT', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/users/sub/${userId}`,
        headers: {'access_token': `${token}`},
        // Add other options like data, params, etc. based on your API needs
    };
    try {
        const res = await axios(requestConfig);
        return res;
    } catch (e) {
        console.log("error", e);
    }
}

/**
 * @Unsubscribe on userId
 * Put Method
 * @Urlparam userId
 *
 * @token
 */

export const unsubscribeChannel = async (userId, token) => {
    const requestConfig = {
        method: 'PUT', // Change this to the HTTP method you want (GET, POST, PUT, DELETE, etc.)
        url: `${baseUrl}/users/unsub/${userId}`,
        headers: {'access_token': `${token}`},
        // Add other options like data, params, etc. based on your API needs
    };
    try {
        const res = await axios(requestConfig);
        return res;
    } catch (e) {
        console.log("error", e);
    }
}