import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {IoAdd} from "react-icons/io5";

import {useStateValue} from "../context/StateProvider";
import {actionType} from "../context/reducer";
import {getAllSongs} from "../API";
import {SongCard} from "./index";



const DashboardSongs = () => {
    const [songFilter, setSongFilter] = useState("");

    const [isFocus, setIsFocus] = useState(false);

    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song,
                });
            });
        }
    }, []);

    return (
        <div className='w-full p-4 flex items-center justify-center flex-col'>
            <div className='w-full flex justify-center items-center gap-20'>
            </div>


            <div className="relative w-full  my-4 p-4 py-12  border-gray-300 rounded-md">
                <div className="absolute top-4 left-4">
                    <p className="text-xl font-bold text-white">
            <span className="text-sm font-semibold text-white">
              Count :{" "}
            </span>
                        { allSongs?.length}
                    </p>
                </div>
                <br/>

                <SongContainer data={allSongs} />
            </div>
        </div>
    );
};

export const SongContainer = ({ data }) => {
    return (
        <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
            {data && data.map((song, i) => (
                <SongCard key={song._id} data={song} index={i} />
                ))}
        </div>
    );
};

export default DashboardSongs