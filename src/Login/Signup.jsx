import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { auth } from "../../src/scenes/Firebaseauth"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography, Container } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMessage('Sign-up successful! You can now log in.');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <Container component="main" maxWidth="xs">
        <div style={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Create Account
          </Typography>
          <form onSubmit={signUp}>
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
          style={{ marginBottom: '8px' }}
        />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
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
              style={{ marginBottom: '16px' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: '16px' }}
            >
              Sign Up
            </Button>
            {error && <Typography color="error" style={{ marginBottom: '16px' }}>{error}</Typography>}
            {successMessage && <Typography style={{ marginBottom: '16px' }}>{successMessage}</Typography>}
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
