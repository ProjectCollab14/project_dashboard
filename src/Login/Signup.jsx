import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { auth } from "../../src/scenes/Firebaseauth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import { ref, uploadBytes } from 'firebase/storage'; 
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { imgDB, txtDB } from "../../src/scenes/Firebaseauth/index"

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [projectName, setProjectName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Get user ID
      const userId = userCredential.user.uid;

      // Upload profile picture to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(imgDB, `profilePictures/${userId}`);
        await uploadBytes(storageRef, profilePicture);
      }

      // Save user data to Firestore
      const userCollectionRef = collection(txtDB, 'users');
      await addDoc(userCollectionRef, {
      userId,
      username,
      email,
      contactNumber,
      projectName,
      company,
      profilePicture: profilePicture ? `profilePictures/${userId}` : null, // Save profile picture URL
      });
      setSuccessMessage('Sign-up successful! You can now log in.');
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Container component="main" maxWidth="md"> 
        <div style={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Create Account
          </Typography>
          <form onSubmit={signUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="projectName"
                  label="Project Name"
                  name="projectName"
                  autoComplete="off"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  name="company"
                  autoComplete="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureChange} 
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
            >
              Sign Up
            </Button>
            {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
            {successMessage && <Typography style={{ marginTop: '16px' }}>{successMessage}</Typography>}
          </form>
          <Typography>
            Already have an account? <Link to="/signin">Log In</Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
