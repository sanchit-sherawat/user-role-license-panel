import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';

function LicenseManager() {
  const [licenses, setLicenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ userId: '', maxUsers: '' });

  const fetchLicenses = async () => {
    const res = await axios.get('/licenses');
    setLicenses(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('/users/admin-users');
    setUsers(res.data);
  };

  const createLicense = async () => {
    if (!formData.userId || !formData.maxUsers) return;
    await axios.post('/licenses', formData);
    setFormData({ userId: '', maxUsers: '' });
    fetchLicenses();
  };

  const updateLicense = async (id, newMaxUsers) => {
    await axios.put(`/licenses/${id}`, { maxUsers: newMaxUsers });
    fetchLicenses();
  };

  useEffect(() => {
    fetchLicenses();
    fetchUsers();
  }, []);

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>License Management</h2>

        {/* Create License */}
        <div style={styles.card}>
          <h3>Create New License</h3>
          <div style={styles.form}>
            <select
              value={formData.userId}
              onChange={e => setFormData({ ...formData, userId: e.target.value })}
              style={styles.input}
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Max Users"
              value={formData.maxUsers}
              onChange={e => setFormData({ ...formData, maxUsers: e.target.value })}
              style={styles.input}
            />

            <button onClick={createLicense} style={styles.button}>Create License</button>
          </div>
        </div>

        {/* License List */}
        <div style={styles.card}>
          <h3>All Licenses</h3>
          {licenses.length === 0 && <p>No licenses found.</p>}
          <ul style={styles.list}>
            {licenses.map(license => (
              <li key={license._id} style={styles.item}>
                <div>
                  <strong>User:</strong> {license.userId?.username} ({license.userId?.email})<br />
                  <strong>Max Users:</strong>
                  <input
                    type="number"
                    defaultValue={license.maxUsers}
                    onBlur={e => updateLicense(license._id, e.target.value)}
                    style={{ ...styles.input, width: '80px', display: 'inline-block', marginLeft: 8 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '700px',
    margin: '0 auto',
    color: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.6rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  item: {
    background: '#f9f9f9',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
  }
};

export default LicenseManager;
