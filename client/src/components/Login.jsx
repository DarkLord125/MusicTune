import React, {useEffect} from 'react'
import { app } from '../config/Firebaseconfig'
import {FcGoogle} from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import { useStateValue} from "../context/StateProvider";
import {actionType} from "../context/reducer";
import {validateUser} from "../API";

import loginImg from '../assets/img/5624628.jpg'


const Login = ({setAuth}) => {

    // passing app details
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // After login, Navigate user to Home Page
    const navigate = useNavigate();

    // Creating a State
    const [{user}, dispatch] = useStateValue()

    // function for Google sign-in
    // function is async so that it waits for pop-up and actions are performed

    const logininWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            // If user credentials are found, then set auth value as true in local storage
            if(userCred){
                setAuth(true);
                window.localStorage.setItem("auth","true");

                firebaseAuth.onAuthStateChanged((userCred ) => {
                    // If user credentials are found, then get refresh token and redirect to Home Page
                    // If not then set auth value as false and also set false manually in local storage and redirected to Login Page
                    if(userCred){
                        userCred.getIdToken().then((token) => {
                            // console.log(token);
                            validateUser(token).then((data) => {
                                // Saving the data inside context provider so that the data can be used everywhere inside our application
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                })
                            })
                        })
                        navigate("/",{replace : true})
                    }
                    else{
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        })
                        navigate("/login")
                    }
                })
            }
        })
    }

    // Restricts user from going to Login Page from Home Page
    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true"){
            navigate("/", {replace : true})
        }
    },[])

    return (


        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-50 h-50 object-cover' src={loginImg} alt="" />
            </div>

            <div className='bg-gray-100 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                    <h2 className='text-4xl font-bold text-center py-6'>MusicTune</h2>
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input className='border p-2' type="text" />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input className='border p-2' type="password" />
                    </div>
                    <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
                    <hr/>
                    <br/>
                    <div className='gap-2 px-4 py-2 items-center justify-center flex bg-amber-300' onClick={logininWithGoogle}>
                        <FcGoogle className='text-xl'/>
                        Sign In with Google
                    </div>

                </form>
            </div>
        </div>


    )
}
export default Login
