import React, {useEffect, useState} from 'react'
import {Header} from "./index";
import {useStateValue} from "../context/StateProvider";
// import Filter from "./Filter";
import {getAllSongs} from "../API";
import {actionType} from "../context/reducer";
import {motion} from "framer-motion";
import {filters} from "../utilities/supportfunctions";



const Home = () => {

    const [{allSongs}, dispatch] = useStateValue();

    const HomeSongContainer = ({ musics }) => {
        const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

        const addSongToContext = (index) => {
            if (!isSongPlaying) {
                dispatch({
                    type: actionType.SET_IsSONG_PLAYING,
                    isSongPlaying: true,
                });
            }
            if (songIndex !== index) {
                dispatch({
                    type: actionType.SET_SONG_INDEX,
                    songIndex: index,
                });
            }
        };

        return (
            <>
                {musics?.map((data, index) => (
                    <motion.div
                        key={data._id}
                        whileTap={{ scale: 0.8 }}
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                        onClick={() => addSongToContext(index)}
                    >
                        <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={data.imageURL}
                                alt=""
                                className=" w-full h-full rounded-lg object-cover"
                            />
                        </div>

                        <p className="text-base text-headingColor font-semibold my-2">
                            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                            <span className="block text-sm text-gray-400 my-1">
                            {data.artist}
                            </span>
                        </p>
                    </motion.div>
                ))}

            </>
        );
    };


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


    return(
        <div className='w-full h-auto flex flex-col items-center justify-center bg-zinc-900'>
        <Header/>
            <h1 className=" text-3xl text-white">Discover New Songs </h1>
            <br/><br/>
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 bg-zinc-900'">
            <HomeSongContainer musics={allSongs} />
        </div>
    </div>
    );

}


export default Home;