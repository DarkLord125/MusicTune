import React, {useEffect} from "react";
import {useStateValue} from "../context/StateProvider";
import {getAllUsers, getAllSongs, getAllAlbums, getAllArtist} from "../API/index";
import {actionType} from "../context/reducer";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { bgColors } from "../utilities/styles";

// sub component
export const DashboardCard = ({ icon, name, count }) => {
    const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

    return(
        <div style={{ background: `${bg_color}` }} className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400'>
            {icon}
            <p className="text-xl text-textColor font-bold">{ name }</p>
            <p className="text-xl text-textColor font-bold">{ count }</p>
        </div>
    )
}

const DashboardHome = () => {
    // Custom Hook
    const [{allUsers, allSongs, artists, allAlbums}, dispatch] = useStateValue();

    // useEffect will only render once because of the empty dependencies -[] but will re-render when changes happen in the empty dependencies
    useEffect(() => {
        if(!allUsers) {
            getAllUsers().then((data) => {
                console.log(data);
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                });
            });
        }

        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }

        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({
                    type: actionType.SET_ARTISTS,
                    artists: data.artist,
                });
            });
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                });
            });
        }
    }, [])


    return (
        <div className='w-full p-6 items-center flex justify-evenly flex-wrap'>
            {/* displays the total no. of user objects  */}
            <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

            <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

            <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={artists?.length > 0 ? artists?.length : 0} />

            <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
        </div>
    );
};

export default DashboardHome;