import axios from "axios";
import {config} from "../config/config";

const baseUrl =config.API_URL;
/**
 * @Like on Video Id
 * Put Method
 * @Urlparam videoId
 * @bodyparm userId
 * @token
 */

/**
 * @View on Video Id
 * PUT Method
 * @Urlparam videoId
 *
 * @token
 */

export const addViewOnVideo=async (videoId)=>{
    const res = await axios.put(`${baseUrl}/videos/view/${videoId}`);
    return res;
}