import React from "react";
import {Link} from "react-router-dom";


const Home = () => {
    return (
        <>
                <div className="homepage">

                    <h3>Please Sign In to your personal account! or Create new account</h3>
                    <div>
                        <Link to='/signin'>
                            <button className=''>Sign In</button>
                        </Link>
                        <Link to='/signup'>
                            <button className=''>Sign UP</button>
                        </Link>

                    </div>
                </div>


        </>
    )
}
export default Home;