import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { setUser } from "../features/auth/authSlice";

import { normalizeUser } from "../utils/normalizeUser";

import { updateUserProfile } from "../firebase/userService";

// Upload + Firestore update
import { uploadProfilePhoto } from "../firebase/storageService";


const Profile = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null); 

  // const handleUpdateProfile = async () => {
  //   try {
  //     setLoading(true);

  //   //   await updateProfile(auth.currentUser, {
  //   //     displayName,
  //   //   });

  //   const updatedUser = await updateUserProfile(user.uid, {
  //       displayName,
  //   });

  //   // Firebase user güncellendi → Redux sync
  //   //   dispatch(setUser(normalizeUser(auth.currentUser)));

  //   // 🔥 Redux sync (kritik nokta)
  //   dispatch(setUser({...user, ...updatedUser}));

  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   if (!user) {
//   return <Typography align="center">Loading...</Typography>;
//   };

  const handleFileChange = (e) => {
      if (e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
      }
  };

  // const handleUploadPhoto = async () => {
  //   if (!selectedFile) return;

  //   try {
  //       setLoading(true);

  //       console.log("AUTH UID (redux user):", user?.uid);
  //       console.log("CURRENT USER (firebase):", auth.currentUser);

  //       const photoURL = await uploadProfilePhoto(user.uid,selectedFile);
  //       const updateUser = await updateUserProfile(user.uid, { photoURL });

  //       dispatch(setUser({...user, ...updateUser }));
  //   } catch (error) {
  //       console.error(error);
  //   } finally {
  //       setLoading(false);
  //   }
  // };


  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let photoURL = user.photoURL;

      // 1️⃣ Foto varsa → upload
      if (selectedFile) {
        photoURL = await uploadProfilePhoto(user.uid, selectedFile);
      }

      // 2️⃣ Firestore update (tek sefer)
      const updatedUser = await updateUserProfile(user.uid, {
        displayName,
        photoURL,
      });

      // 3️⃣ Redux sync
      dispatch(setUser({
        ...user,
        ...updatedUser,
      }));

      setSelectedFile(null);
    } catch (error) {
        console.error("Profile update failed:", error);
    } finally {
        setLoading(false);
    }
  };

  if (!user) return null;

// test upload without auth
const testUploadWithoutAuth = async () => {
  console.log("CURRENT USER:", auth.currentUser);

  try {
    await uploadProfilePhoto("FAKE_UID", new File(["test"], "test.txt"));
    console.log("❌ Upload OLDU (olmamalı)");
  } catch (err) {
    console.log("✅ Upload BLOCKLANDI:", err.message);
  }
};

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Avatar
        // src={user.photoURL || ""}
        src={
          selectedFile ? URL.createObjectURL(selectedFile) :
          user.photoURL || ""
        }
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
        {/* {user.displayName?.[0] || user.email?.[0]} */}
        <Button variant="outlined" component="label" fullWidth>
            Select Photo
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
        </Button>
        {/* <Button 
            fullWidth
            variant="contained"
            sx={{ mt:2 }}
            onClick={handleUploadPhoto}
            disabled={loading || !selectedFile }
        >
            Upload Photo
        </Button> */}

      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>

      <TextField
        fullWidth
        label="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        value={user.email}
        disabled
        margin="normal"
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        // onClick={handleUpdateProfile}
        onClick={handleSaveProfile}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </Box>
  );
};

export default Profile;
