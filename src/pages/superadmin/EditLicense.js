import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';

function EditLicense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState(null);
  const [maxUsers, setMaxUsers] = useState('');

  const fetchLicense = async () => {
    try {
      const res = await axios.get(`/licenses/${id}`);
      setLicense(res.data);
      setMaxUsers(res.data.maxUsers);
    } catch (error) {
      console.error('Error fetching license:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/licenses/${id}`, { maxUsers });
      navigate('/super/licenselist');
    } catch (error) {
      console.error('Error updating license:', error);
    }
  };

  useEffect(() => {
    fetchLicense();
  }, []);

  if (!license) return <SidebarLayout><p style={{ padding: '2rem' }}>Loading...</p></SidebarLayout>;

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Edit License</h2>
        <div style={styles.card}>
          <p><strong>User:</strong> {license.userId?.username} ({license.userId?.email})</p>
          <label style={styles.label}>Max Users:</label>
          <input
            type="number"
            value={maxUsers}
            onChange={(e) => setMaxUsers(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleUpdate} style={styles.button}>Update License</button>
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  label: {
    display: 'block',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default EditLicense;
