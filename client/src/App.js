import React, {useEffect, useState} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard, Home, Login, MusicPlayer, Search, Songs} from "./components";
import { app } from './config/Firebaseconfig'
import {getAuth} from "firebase/auth";
import {AnimatePresence, motion} from "framer-motion";
import {getAllSongs, validateUser} from "./API";
import { useStateValue} from "./context/StateProvider";
import {actionType} from "./context/reducer";



const App = () => {

    const firebaseAuth =  getAuth(app);
    // Hook to help user navigate
    const navigate = useNavigate();

    // Creating a State
    const [{user, allSongs, isSongPlaying}, dispatch] = useStateValue();

    // To monitor the user login state
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

    // To check authentication changes
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred ) => {
            // If user credentials are found, then get refresh token
            // If not then set auth value as false and set false manually in local storage and redirected to Login Page
            if(userCred){
                userCred.getIdToken().then((token) => {
                    // Call function and pass token and getting data from token and print in console
                    window.localStorage.setItem("auth", "true");
                    validateUser(token).then((data) => {
                        // console.log(data);
                        // Saving the data inside context provider so that the data can be used everywhere inside our application
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        });
                    });
                });
            }else {
                setAuth(false);
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                window.localStorage.setItem("auth", "false");
                navigate("/login")
            }
        })
    },[])

    useEffect(() => {
        if (!allSongs && user) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
        <div className = 'h-auto min-w-[680px] bg-primary flex justify-center items-center'>
            <Routes>
                <Route path='/login' element={<Login setAuth={setAuth}/>} />
                <Route path='/*' element={<Home/>} />
                <Route path='/songs' element={<Songs/>} />
                <Route path='/search' element={<Search/>} />
                <Route path='/dashboard/*' element={<Dashboard />} />
            </Routes>

            {isSongPlaying && (
                <motion.div
                initial={{opacity : 0, y : 50}}
                animate={{opacity : 1, y : 0}}
                className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl 
                backdrop-blur-md flex items-center justify-center`}
                >
                    <MusicPlayer />
                </motion.div>
            )}
        </div>
        </AnimatePresence>
    );
};
export default App;
