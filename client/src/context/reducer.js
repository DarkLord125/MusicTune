// One of the context providers
// every fetching action the user makes
export const actionType = {
    SET_USER: "SET_USER",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_FILTER_TERM: "SET_FILTER_TERM",
    SET_ALL_USERS: "SET_ALL_USERS",
    SET_ARTISTS: "SET_ARTISTS",
    SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
    SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
    SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
    SET_ALL_SONGS: "SET_ALL_SONGS",
    SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
    SET_SONG_INDEX: "SET_SONG_INDEX",
    SET_IsSONG_PLAYING: "SET_IsSONG_PLAYING",
};

const reducer = (state, action) => {
    // To know what kind of action is triggered
    console.log(action);

    // To know what type of action it is
    switch (action.type){
        case actionType.SET_USER:
            return{
                ...state,
                // Only change the user state not entire website state
                user: action.user,
            }

        case actionType.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.searchTerm,
            };

        case actionType.SET_FILTER_TERM:
            return {
                ...state,
                filterTerm: action.filterTerm,
            };

        case actionType.SET_ALL_USERS:
            return{
                ...state,
                allUsers: action.allUsers,
            }
        case actionType.SET_ALL_SONGS:
            return{
                ...state,
                allSongs: action.allSongs,
            }
        case actionType.SET_ARTISTS:
            return {
                ...state,
                artists: action.artists,
            };

        case actionType.SET_ARTIST_FILTER:
            return {
                ...state,
                artistFilter: action.artistFilter,
            };

        case actionType.SET_LANGUAGE_FILTER:
            return {
                ...state,
                languageFilter: action.languageFilter,
            };

        case actionType.SET_ALL_ALBUMS:
            return {
                ...state,
                allAlbums: action.allAlbums,
            };

        case actionType.SET_ALBUM_FILTER:
            return {
                ...state,
                albumFilter: action.albumFilter,
            };

        case actionType.SET_SONG_INDEX:
            return {
                ...state,
                songIndex: action.songIndex,
            };

        case actionType.SET_IsSONG_PLAYING:
            return {
                ...state,
                isSongPlaying: action.isSongPlaying,
            };



        default:
            return state;
    }
};

export default reducer;