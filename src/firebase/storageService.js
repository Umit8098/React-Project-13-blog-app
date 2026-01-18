import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadProfilePhoto = async ( uid, file ) => {
    if ( !uid || !file ) throw new Error("UID and file are required");

    const fileRef = ref(storage, `profilePhotos/${uid}`)

    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;   
};