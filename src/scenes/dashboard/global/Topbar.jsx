import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField, // Import TextField component
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../Firebaseauth/index";
import { getDocs, query, collection, where } from "firebase/firestore";

const ProfileDialog = ({ open, onClose, userData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent sx={{ padding: "20px" }}>
        {/* Display user data in form */}
        <form>
          <TextField
            label="Username"
            value={userData.username}
            fullWidth
            disabled
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Contact Number"
            value={userData.contactNumber}
            fullWidth
            disabled
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Project Name"
            value={userData.projectName}
            fullWidth
            disabled
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Company"
            value={userData.company}
            fullWidth
            disabled
            sx={{ marginBottom: "10px" }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const SignInForm = () => {
  // Define your form fields and handlers here
  return (
    <form>
      {/* Form fields */}
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {/* Submit button */}
      <button type="submit">Sign In</button>
    </form>
  );
};

const Topbar = ({ isauthenticated }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null); // State to store the current user

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update user state
        setUser(user);
      } else {
        // User is signed out, clear user state
        setUser(null);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch user data when user state changes
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    console.log("Fetching user data for userId:", userId);

    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("userId", "==", userId))
    );

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      setUserData(docSnap.data());
    } else {
      console.log("No such user!");
    }
  };

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  const toggleProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  const handleIconClick = () => {
    if (user) {
      toggleProfileDialog();
    }
  };

  if (!isauthenticated) {
    return null; // Don't render the Topbar if the user is not authenticated
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors?.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {user && (
          <IconButton onClick={handleIconClick}>
            <PersonOutlinedIcon />
          </IconButton>
        )}
        {/* Profile Dialog */}
        {userData && (
          <ProfileDialog
            open={showProfileDialog}
            onClose={toggleProfileDialog}
            userData={userData}
          />
        )}
      </Box>

      {/* Sign In Form Dialog */}
      <Dialog open={showSignInForm} onClose={toggleSignInForm}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <SignInForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleSignInForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;
