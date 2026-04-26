import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userid', res.data.user._id);
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('email', res.data.user.email);



      const user = JSON.parse(atob(res.data.token.split('.')[1]));
      navigate(res.data.user.roles[0].name === 'super_admin' ? '/super-admin' : '/admin');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #74ebd5, #9face6)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  error: {
    color: '#f44336',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textAlign: 'center',
  }
};

export default Login;
