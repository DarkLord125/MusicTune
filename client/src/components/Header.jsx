import React, {useState} from 'react'

import {Logo} from '../assets/img'
import {NavLink, useNavigate} from "react-router-dom";
import { isActiveStyles, isInactiveStyles} from "../utilities/styles";
import {BsPatchCheckFill} from "react-icons/bs";
import {useStateValue} from "../context/StateProvider";
import {getAuth} from "firebase/auth";
import {app} from "../config/Firebaseconfig";
import {motion} from "framer-motion";

//  We are calling a callback function, inside callback function, we are extracting an object (Navigation Bar)
// Down below is a Custom hook which has user object
const Header = () => {
    const [{user}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false);

    const navigate = useNavigate()

    // Logout Function
    const logOut = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));
        navigate("/login", {replace : true})
    }

    return(
        <header className='flex items-center w-full p-4 md:py-2 md:px-6 '>
            <NavLink to={"/"}>
            <img src={Logo} alt="Logo" className='w-16'/>
            </NavLink>


            <ul className='flex items-center justify-center ml-7 '>
                <li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}>Home</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/songs'} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}>Albums & Artists</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/search'} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}>Search</NavLink></li>
            </ul>

        <div
            onMouseEnter={() => setIsMenu(true)}
            onMouseLeave={() => setIsMenu(false)}
            className='flex items-center ml-auto cursor-pointer gap-2 relative'>
            <img src={user?.user?.imageURL} className='w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="" referrerPolicy='no-referrer'/>
            <div className='flex flex-col'>
                <p className='text-red-600 text-lg hover:text-red-500 font-bold'>{user?.user?.name}</p>
                <p className='flex items-center gap-2 text-xs text-amber-300 font-normal'>Premium Member <BsPatchCheckFill className='text-sm -ml-1 text-blue-500'/></p>
            </div>

            {isMenu && (
                <motion.div
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 50}}
                    className='absolute z-10 flex flex-col p-3 top-12 p-4 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm'>

                    {
                        user?.user?.role === "admin" && (
                            <>
                                <NavLink to={"/dashboard/home"}>
                                    <p className='text-base text-red-600 hover:font-bold duration-150 transition-all ease-in-out'>Dashboard</p>
                                </NavLink>
                                <hr className='h-px bg-gray-200 border-0 dark:bg-gray-700'/>
                            </>
                        )
                    }
                    <p className='text-base text-red-600 hover:font-bold duration-150 transition-all ease-in-out' onClick={logOut}>Sign Out</p>
                </motion.div>
            )}
        </div>
        </header>
    )
}
export default Header