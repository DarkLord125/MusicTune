import React, {useEffect} from 'react'
import {Header} from "./index";
import {useStateValue} from "../context/StateProvider";

import {getAllSongs} from "../API";
import {actionType} from "../context/reducer";
import {SongContainer} from "./DashboardSongs";


const Home = () => {

    const [{allSongs}] = useStateValue();

    const HomeSongContainer = ({ musics }) => {
        const [{ isSongPlaying, songIndex }, dispatch] = useStateValue();

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
                <div className="relative w-full  my-4 p-4 py-12  border-gray-300 rounded-md">
                    <SongContainer data={allSongs} />
                </div>
            </div>
        );
    };

    return(
        <div className='w-full h-auto flex flex-col items-center justify-center bg-zinc-900'>
        <Header/>
            <h1 className=" text-3xl text-white">Discover New Songs </h1>
        <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4 bg-zinc-900'">
            <HomeSongContainer musics={allSongs} />
        </div>
    </div>
    );

}


export default Home;
