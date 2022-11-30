import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/Firebaseconfig";

export const filters = [
    // { id: 1, name: "Hip Hop", value: "Hip Hop" },
    // { id: 2, name: "Rock", value: "Rock" },
    // { id: 3, name: "EDM", value: "EDM" },
    // { id: 4, name: "Pop", value: "Pop" },
];

export const filterByLanguage = [
    { id: 1, name: "Japanese", value: "Japanese" },
    { id: 2, name: "English", value: "English" },
    { id: 3, name: "French", value: "French" },
    { id: 4, name: "Hindi", value: "Hindi" },
    { id: 4, name: "Chinese", value: "Chinese" },
    { id: 4, name: "Russian", value: "Russian" },
];

export const deleteAnObject = (referenceUrl) => {
    const deleteRef = ref(storage, referenceUrl);
    deleteObject(deleteRef)
        .then(() => {
            return true;
        })
        .catch((error) => {
            return false;
        });
};