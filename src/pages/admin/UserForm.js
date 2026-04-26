import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


function UserForm() {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: [],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const res = await axios.get('/roles/non-admin-roles');
    setRoles(res.data);
  };
  const roleOptions = roles.map(role => ({
    value: role._id,
    label: role.name,
  }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.roleId.length) newErrors.roleId = 'At least one role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createUser = async () => {
    if (!validate()) return;

    const data = {
      userId: userid,
      username: formData.name,
      email: formData.email,
      password: formData.password,
      roles: formData.roleId,
    };

    try {
      await axios.post('/users/register', data);
      alert('User created successfully');
      setFormData({ name: '', email: '', password: '', roleId: [] });
      navigate('/userlist');
    } catch (error) {
      alert('Error creating user');
    }
  };

  const handleRoleChange = (selectedOptions) => {
    const selectedRoleIds = selectedOptions.map(option => option.value);
    setFormData({ ...formData, roleId: selectedRoleIds });
  };

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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}

            {/* Optional Password Field */}
            {/* <input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
            /> */}

            <label style={{ fontWeight: 'bold' }}>Assign Roles:</label>
            <Select
              isMulti
              options={roleOptions}
              onChange={handleRoleChange}
              value={roleOptions.filter(option => formData.roleId.includes(option.value))}
              placeholder="Select roles..."
              styles={{
                control: (base) => ({
                  ...base,
                  padding: '2px',
                  borderRadius: '6px',
                  borderColor: '#ccc',
                }),
              }}
            />
            {errors.roleId && <span style={styles.error}>{errors.roleId}</span>}

            {formData.roleId.length > 0 && (
              <div style={styles.selectedRoles}>
                Selected Roles:
                <ul>
                  {formData.roleId.map((id) => {
                    const role = roles.find((r) => r._id === id);
                    return <li key={id}>{role?.name || id}</li>;
                  })}
                </ul>
              </div>
            )}

            <button onClick={createUser} style={styles.button}>
              Create User
            </button>
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
    maxWidth: '700px',
    margin: '0 auto',
    color: 'black',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  card: {
    background: '#f1f1f1',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  multiselect: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    height: '120px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    color: '#d9534f',
    fontSize: '0.85rem',
    marginTop: '-0.5rem',
  },
  selectedRoles: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: '#333',
  },
};

export default UserForm;
