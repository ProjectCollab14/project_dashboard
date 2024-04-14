import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom'; // Import useHistory
import { auth } from "../../src/scenes/Firebaseauth"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Typography, Container } from '@mui/material';

const Signin = ({ onAuthChange}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate= useNavigate();

  const signin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      setError(null);
      onAuthChange(true)
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', marginTop: '40px' }}>
      <Container component="main" maxWidth="xs">
        <div style={{ textAlign: 'center' }}>
          <Typography component="h1" variant="h2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Log In to your Account
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} onSubmit={signin}>
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            {error && <Typography color="error" style={{ marginBottom: '16px' }}>{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginBottom: '16px' }}
            >
              Log In
            </Button>
            <Typography>
              Don't have an account? <Link to="/signup">Create new user</Link>
            </Typography>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signin;
