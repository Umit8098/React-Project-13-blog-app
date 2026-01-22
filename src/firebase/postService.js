import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createPost = async ({ title, content, user }) => {
    
    if (!user) throw new Error("Auth required to create a post.");
    if (!title || !content) throw new Error("Title and content are required.");

    const postData = {
        title,
        content,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        authorPhotoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, "posts"), postData);
    
    return { 
        id: docRef.id, 
        ...postData 
    };
};   