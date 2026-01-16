import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUserIfNotExists = async(authUser) => {
    
    if (!authUser) return null;

    const userRef = doc(db, "users", authUser.uid);
    const userSnap = await getDoc(userRef);

    //! Kullanıcı yoksa oluştur
    if (!userSnap.exists()) {
        const newUser = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "",
            photoURL: authUser.photoURL || "",
            role: "user",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, newUser);

        const freshSnap = await getDoc(userRef);
        return freshSnap.data();
    }

    // ✅ Varsa mevcut user'ı dön
    return userSnap.data();
};


export const updateUserProfile = async(uid, data) => {
    
    if (!uid) throw new Error("UID is required");

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),    
    });

    return {
        uid,
        ...data,
    };
};