import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';

function LicenseList() {
  const [licenses, setLicenses] = useState([]);
  const navigate = useNavigate();

  const fetchLicenses = async () => {
    const res = await axios.get('/licenses');
    setLicenses(res.data);
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Assigned Licenses</h2>

        <div style={styles.card}>
          {licenses.length === 0 ? (
            <p>No licenses assigned yet.</p>
          ) : (
            <ul style={styles.list}>
              {licenses.map(license => (
                <li key={license._id} style={styles.item}>
                  <div>
                    <strong>User:</strong> {license.userId?.username} ({license.userId?.email})<br />
                    <strong>Max Users:</strong> {license.maxUsers}
                  </div>
                  <button
                    onClick={() => navigate(`/super/edit-license/${license._id}`)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
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
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f1f5f9',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LicenseList;
