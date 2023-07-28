import React, {useState, useEffect} from "react";
import axios from "axios";
import './auth.css';
import {Link,useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {loginStart, loginSuccess, loginFailure} from "../../redux/userSlice.js";
import {config} from '../../config/config';
import {ToastContainer, toast} from 'react-toastify';
import Cookies from 'universal-cookie';


const SignIn = () => {
    const cookies = new Cookies();

    const baseUrl = config.API_URL;
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const checkAuth =async ()=>{
        if(currentUser){
            navigate('/videopage')
        }
    }

    useEffect(() => {
        checkAuth();
        toast.info("Note : You have to logged in for getting access of all features! ", {theme:'dark',position:'top-center'});

    }, [currentUser]);

    const loginToastOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const loginErrorToastOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        type: "default",
        theme: "dark",
    };

    const errorToastOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        type: "default",
        theme: "dark",
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validation = async (data) => {
        const {email, password} = data;
        if (email === "") {
            toast.error("Please provide valid email id", errorToastOptions);
            return false
        } else if (email.length < 5 && await isValidEmail(email) === false) {
            toast.error("Please provide valid email id", errorToastOptions);
            return false
        } else if (password === "") {
            toast.error("Password cant be empty", errorToastOptions);
            return false
        }
        return true
    }


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        let {email, password} = formData;
        e.preventDefault();
        if (await validation(formData)) {
            // Perform validation or API call with the form data
            dispatch(loginStart());
            try {
                const response = await axios.post(`${baseUrl}/auth/signin`, {
                    email,
                    password,
                })

                cookies.set('access_token', `${response.data.token}`, { path: '/' });

                dispatch(loginSuccess(response.data));
                    toast.success("Logged in successfully", loginToastOptions);
                    setTimeout(()=>{
                        navigate('/videopage')
                    },2000)

            } catch (e) {
                dispatch(loginFailure());
                toast.error("Error! check your information",errorToastOptions);
            }

        } else {
            console.log("validation error");
        }

    };
    return (
        <>


            <div className='signin_main'>

                <div className="header_signin">
                    <img src='/assets/images/youtube.png'/>
                    <p>Sign In</p>
                </div>
                <p>Sign in to your account</p>

                <div className='container_main'>

                    <form className='form' onSubmit={handleSubmit}>
                        <div className='field'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='field'>
                            <button type="submit">Sign In</button>
                        </div>
                        <p>Don't have an account? then <Link to='/signup'><span>Sign Up</span></Link></p>

                    </form>
                </div>

            </div>
            <ToastContainer/>
        </>
    );
}

export default SignIn;