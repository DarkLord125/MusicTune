import {Header} from "./index";

import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import { getAllAlbums, getAllArtist } from "../API";


import {AiFillInfoCircle} from "react-icons/ai";
import {IoLogoInstagram, IoLogoTwitter} from "react-icons/io";

const AlbumsArtists = () => {

    const [{ allAlbums, artists }, dispatch] = useStateValue();
    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album });
            });
        }
    }, []);

    useEffect(() => {
        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.artist });
            });
        }
    }, []);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center bg-zinc-900'>
            <Header />
            <h1 className=" text-3xl text-white">Albums</h1>
            <div className="w-full p-4 flex items-center justify-center flex-col">
                <div className="relative w-full gap-3  my-4 p-4 py-12 border-gray-300 rounded-md flex flex-wrap justify-evenly">
                    {allAlbums &&
                        allAlbums.map((data, index) => (
                            <>
                                <AlbumCard key={index} data={data} index={index} />

                            </>
                        ))}
                </div>
            </div>

            <div className="w-full p-4 flex items-center justify-center flex-col">
                <h1 className=" text-3xl text-white">Artists</h1>
                <div className="relative w-full gap-3  my-4 p-4 py-12 border-gray-300 rounded-md flex flex-wrap justify-evenly">
                    {artists &&
                        artists.map((data, index) => (
                            <>
                                <ArtistCard key={index} data={data} index={index} />
                            </>
                        ))}
                </div>

            </div>

        </div>

    )
}

export const AlbumCard = ({ data, index }) => {

    const [isInfo, setIsInfo] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative overflow-hidden w-44 min-w-180 px-3 py-5 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"

        >
            <motion.img
                whileHover={{ scale: 1.05 }}
                src={data?.imageURL}
                className="w-full h-40 object-cover rounded-md"
                alt=""
            />


            <p className="text-base text-textColor">{data.name}</p>

            <motion.i
                className="absolute bottom-2 right-2"
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsInfo(true)}
            >
                <AiFillInfoCircle className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
            </motion.i>

            {isInfo && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
                >
                    <p className="text-gray-100 text-base text-center">
                        Album Release Date - {data?.albumDate}
                    </p>
                    <p className="text-gray-100 text-base text-center">
                        Language - {data?.albumLanguage}
                    </p>

                    <div className="flex items-center w-full justify-center gap-3">
                        <div
                            className="bg-green-300 px-3 rounded-md"
                            onClick={() => setIsInfo(false)}
                        >
                            <p className="text-headingColor text-sm">Ok</p>
                        </div>
                    </div>
                </motion.div>
            )}

        </motion.div>

    );

}

export const ArtistCard = ({ data, index }) => {
    const [isInfo, setIsInfo] = useState(false);
    return (
        <motion.div
            initial={{opacity: 0, translateX: -50}}
            animate={{opacity: 1, translateX: 0}}
            transition={{duration: 0.3, delay: index * 0.1}}
            className="relative w-44 min-w-180 px-3 py-5 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        >
            <motion.img
                whileHover={{ scale: 1.05 }}
                src={data?.imageURL}
                className="w-full h-40 object-cover rounded-md"
                alt=""
            />

            <p className="text-base text-textColor">{data.name}</p>
            <div className="flex items-center gap-4">
                <a href={data.instagram} target="_blank">
                    <motion.i whileTap={{scale: 0.75}}>
                        <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl"/>
                    </motion.i>
                </a>

            </div>
            <motion.i
                className="absolute bottom-2 right-2"
                whileTap={{scale: 0.75}}
                onClick={() => setIsInfo(true)}
            >
                <AiFillInfoCircle className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer"/>
            </motion.i>

            {isInfo && (
                <motion.div
                    initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.5}}
                    className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
                >
                    <p className="text-gray-100 text-base text-center">
                        About - {data?.artistDetail}
                    </p>
                    <p className="text-gray-100 text-base text-center">
                        Country - {data?.artistCountry}
                    </p>
                    <p className="text-gray-100 text-base text-center">
                        Genre - {data?.artistGenre}
                    </p>
                    <div className="flex items-center w-full justify-center gap-3">
                        <div
                            className="bg-green-300 px-3 rounded-md"
                            onClick={() => setIsInfo(false)}
                        >
                            <p className="text-headingColor text-sm">Ok</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}


export default AlbumsArtists;