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
import { collection, getDocs } from "firebase/firestore";
import { txtDB } from "../../Firebaseauth/index";

const ProfileDialog = ({ open, onClose, userData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <img src={userData.profileImage} alt="Profile" style={{ marginRight: '16px', borderRadius: '50%', width: '50px', height: '50px' }} />
          <Typography variant="h6">{userData.username}</Typography>
        </Box>
        <Typography variant="body1">Contact Number: {userData.contactNumber}</Typography>
        <Typography variant="body1">Project Name: {userData.projectName}</Typography>
        <Typography variant="body1">Company: {userData.company}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  const toggleProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  useEffect(() => {
    // Fetch user data from Firestore
    const fetchUserData = async () => {
      const userCollectionRef = collection(txtDB, 'users');
      const querySnapshot = await getDocs(userCollectionRef);
      const userData = querySnapshot.docs.map(doc => doc.data());
      setUserData(userData);
    };

    fetchUserData();
  }, []);

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
        <IconButton onClick={toggleProfileDialog}>
          <PersonOutlinedIcon />
        </IconButton>
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
