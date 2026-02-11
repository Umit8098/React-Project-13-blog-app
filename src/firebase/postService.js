import { 
    collection, 
    addDoc, 
    serverTimestamp, 
    getDocs,
    query,
    orderBy,
    doc,
    getDoc,
    deleteDoc,
 } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createPost = async ({ 
    title, 
    content, 
    user, 
    imageURL = "",
 }) => {
    
    if (!user) throw new Error("Auth required to create a post.");
    if (!title || !content) throw new Error("Title and content are required.");

    const postData = {
        title,
        content,
        imageURL,
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

export const getPosts = async () => {
    const q = query(
        collection(db, "posts"), 
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const getPostById = async (id) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Post not found");
    }

    return { 
        id: docSnap.id, 
        ...docSnap.data() 
    };
};

export const deletePost = async (postId, userId) => {
    if (!postId) throw new Error("Post ID is required.");
    if (!userId) throw new Error("User not authenticated.");

    const postRef = doc(db, "posts", postId);
     await deleteDoc(postRef);
};