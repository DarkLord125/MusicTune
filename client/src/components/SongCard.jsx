import React from "react";
import {motion} from "framer-motion";

import { useStateValue} from "../context/StateProvider";
import { actionType} from "../context/reducer";


const SongCard = ({ data, index}) => {
    const [{songIndex, isSongPlaying}, dispatch] = useStateValue();

    const addToContext = () => {
        if(!isSongPlaying){
            dispatch({
                type: actionType.SET_IsSONG_PLAYING,
                isSongPlaying: true,
            });
        }

        if(songIndex !== index){
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }


    }

    return(
        <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                    onClick={addToContext}
        >
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                    src={data.imageURL}/>
            </div>

            <p className="text-base text-headingColor font-bold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
                {data.artist && (
                    <span className="block text-sm text-gray-400 my-1">
                        {data.artist.length > 25
                        ? `${data.artist.slice(0, 25)}....`: data.artist}
                    </span>
                    )}
            </p>


        </motion.div>

    );



};

export default SongCard;