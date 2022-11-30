import React, { useEffect } from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getAllAlbums, getAllArtist } from "../API";
import { filterByLanguage } from "../utilities/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
    const [{ filterTerm, artists, allAlbums }, dispatch] = useStateValue();

    useEffect(() => {
        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.artist });
            });
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album });
            });
        }
    }, []);

    const clearAllFilter = () => {
        setFilteredSongs(null);
        dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
        dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
        dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
        dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    };
    return (
        <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
            <FilterButtons filterData={artists} flag={"Artist"} />    

            <FilterButtons filterData={allAlbums} flag={"Albums"} />

            <FilterButtons filterData={filterByLanguage} flag={"Language"} />

            <motion.i
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.75 }}
                onClick={clearAllFilter}
            >
                <MdClearAll className="text-slate-50 text-xl cursor-pointer" />
            </motion.i>
        </div>
    );
};

export default Filter;
