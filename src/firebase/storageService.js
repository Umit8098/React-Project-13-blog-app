import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "./firebaseConfig";

/* =========================
   Profile Photo Upload
========================= */
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

/* =========================
   Post Image Upload
========================= */
export const uploadPostImage = async ( uid, file ) => {
    
    const user = auth.currentUser;

    if ( !user ) throw new Error("User not authenticated");
    if ( !file ) return null;

    const fileRef = ref(
        storage, 
        `postImages/${uid}/${Date.now()}_${file.name}`);
    
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;   
};