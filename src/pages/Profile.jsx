import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../features/auth/authSlice";
import { normalizeUser } from "../utils/normalizeUser";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      await updateProfile(auth.currentUser, {
        displayName,
      });

      // Firebase user güncellendi → Redux sync
      dispatch(setUser(normalizeUser(auth.currentUser)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
  return <Typography align="center">Loading...</Typography>;
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
        src={user.photoURL || ""}
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      >
        {user.displayName?.[0] || user.email?.[0]}
      </Avatar>

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
        onClick={handleUpdateProfile}
        disabled={loading}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;
