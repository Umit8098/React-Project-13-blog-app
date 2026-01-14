import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../features/auth/authSlice";

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            dispatch(setUser(user || null));
        });

        return () => unsubscribe();
    }, [dispatch]);
};

export default useAuthListener;