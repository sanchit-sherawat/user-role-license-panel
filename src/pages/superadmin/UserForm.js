import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';
import { useNavigate } from 'react-router-dom';
// ...existing code...

function UserForm() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: [''],
  });

  const navigate = useNavigate();

  let userid=localStorage.getItem('userid')

  const fetchUsers = async () => {
    const res = await axios.get('/users');
    setUsers(res.data);
  };

  const fetchRoles = async () => {
    const res = await axios.get('/roles');
    setRoles(res.data);
  };

  const createUser = async () => {
    let data ={
        userId: userid,
        username: formData.name,
        email: formData.email,
        password: formData.password,
        roles: formData.roleId,
    }
    await axios.post('/users/register', data);
    setFormData({ name: '', email: '', password: '', roleId: ['' ]});
    alert('User created successfully');
    navigate('userlist'); // Redirect to users list after creation
    // Optionally, you can refetch users after creating a new user
    // fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/users/${id}`);
    fetchUsers();
    alert('User deleted successfully');
  };

  useEffect(() => {
    // fetchUsers(); 
    fetchRoles();
  }, []);

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <div style={styles.card}>
          <h3>Create User</h3>
          <div style={styles.form}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
            />
            <select
              value={formData.roleId}
              onChange={e => setFormData({ ...formData, roleId: [e.target.value] })}
              style={styles.input}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role._id} value={role._id}>{role.name}</option>
              ))}
            </select>

            <button onClick={createUser} style={styles.button}>Create User</button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    color: 'black',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: 'black',
  },
  card: {
    background: '#f9f9f9',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
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
  userList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem',
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem',
    borderBottom: '1px solid #ddd',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default UserForm;
