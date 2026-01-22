import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebaseConfig";
import { storage } from "./firebaseConfig";

export const uploadProfilePhoto = async ( uid, file ) => {
    
    const user = auth.currentUser;

    if ( !user ) throw new Error("User not authenticated");

    const fileRef = ref(
        storage, 
        `profilePhotos/${user.uid}/avatar.jpg`);
    
    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;   
};