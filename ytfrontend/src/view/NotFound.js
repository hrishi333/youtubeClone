import React from "react";
import {Link} from 'react-router-dom';

const NotFound =()=>{
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'100%'}}>
            <p style={{fontSize:'20px',color:'grey',marginBottom:'1rem'}}>404 | Invalid route , Route is not exist</p>
            <p style={{fontSize:'14px',color:'grey'}}>Please select right path or go to <Link to={'/'} style={{fontWeight:'bold'}}>Main Page</Link></p>
        </div>
    );
}

export default NotFound;