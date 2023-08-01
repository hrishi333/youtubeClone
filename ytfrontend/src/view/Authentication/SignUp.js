import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import {config} from '../../config/config';

const SignUp = () => {


    const navigate = useNavigate();
    const baseUrl = config.API_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const toastOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const errorToastOptions = {
        className: "toast-position",
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        type: "default",
        theme: "light",
    };

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validation = async (data) => {
        const {name, email, password, confirmPassword} = data;
        if (name === "") {
            toast.error("Please provide a name", errorToastOptions);
        } else if (name.length < 3) {
            toast.error("Please provide a name longer characters", errorToastOptions);
        } else if (email === "") {
            toast.error("Please provide an email id", errorToastOptions);
        } else if (email.length < 5 && await isValidEmail(email) === false) {
            toast.error("Please provide valid email id", errorToastOptions);
        } else if (password === '') {
            toast.error("Please provide password", errorToastOptions)
        } else if (confirmPassword === "") {
            toast.error("Please fill confirm password field", errorToastOptions)
        } else if (password !== confirmPassword) {
            toast.error("Please match the password with confirm password", errorToastOptions);
        }
    }

    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const createUser = async (data) => {
        const {name, email, password} = data;
        try {
            axios.post(`${baseUrl}/auth/signup`, {
                name,
                email,
                password,
            }).then((res)=>{
                if(res.status===200){

                    toast.info("Sign Up is successfull", toastOptions);
                    setTimeout(() => {
                        navigate('/signin');
                    }, 3000)
                }
            }).catch((e)=>{
                toast.error(`${e.response.data.message}`,{theme:"dark",position:'top-center'});
            })


        } catch (e) {
            console.log(e);
            toast.error("Error! check your informations", errorToastOptions)
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform validation or API call with the form data
        await validation(formData);
        createUser(formData);
    };
    return (
        <>
            <div className='signin_main'>
                <div className="header_signin">
                    <img src='/assets/images/youtube.png'/>
                    <p>Sign Up</p>
                </div>
                <p>Sign Up and create new account</p>

                <div className='container_main'>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className='field'>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="name"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
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
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='field'>
                            <button type="submit">Sign Up</button>
                        </div>
                        <p>Already have an account? then <Link to='/signin'><span>Sign In</span></Link></p>
                    </form>
                </div>

            </div>
            <ToastContainer/>
        </>
    )
}
export default SignUp;