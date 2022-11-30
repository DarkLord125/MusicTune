import React from "react";
import {DashboardUsers, Header} from "./index";
import {NavLink, Route, Routes} from "react-router-dom";
import {IoHome} from "react-icons/io5"
import {isActiveStyles, isInactiveStyles} from "../utilities/styles";
import {DashboardHome, DashboardSongs} from "./index";


const Dashboard = () => {
    return (
        <div className='w-full h-auto flex-col flex items-center justify-center bg-zinc-900'>

        <Header/>
            <div className='w-[60%] my-2  p-4 items-center flex justify-evenly'>
                <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}><IoHome className='text-2xl text-red-600'/></NavLink>
                <NavLink to={"/dashboard/user"} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}>Users</NavLink>
                <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyles : isInactiveStyles}>Songs</NavLink>
            </div>

            <div className='my-4 w-full p-4'>
                <Routes>
                    <Route path='/home' element={<DashboardHome/>}/>
                    <Route path='/user' element={<DashboardUsers/>}/>
                    <Route path='/songs' element={<DashboardSongs/>}/>

                </Routes>

            </div>
        </div>
    )
}

export default Dashboard