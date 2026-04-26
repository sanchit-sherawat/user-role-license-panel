import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';

function UserList() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [editUser, setEditUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', email: '', password: '' });


    const fetchUsers = async () => {
        const res = await axios.get('/users/all');
        setUsers(res.data);
    };
    // ('/api/roles'

    const handleEditClick = (user) => {
        setEditUser(user);
        setEditFormData({ name: user.name, email: user.email, password: '' });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`/users/${editUser._id}`, editFormData);
            setEditUser(null);
            fetchUsers();
            alert('User updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Error updating user');
        }
    };

    const resetRoles = async (id) => {
        try {
            await axios.put(`/users/${id}/reset-roles`);
            fetchUsers();
            alert('Roles reset to default');
        } catch (err) {
            console.error(err);
            alert('Failed to reset roles');
        }
    };




    const deleteUser = async (id) => {
        await axios.delete(`/users/${id}`);
        fetchUsers();
        alert('User deleted successfully');
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <SidebarLayout>
           {editUser && (
    <div style={styles.modalOverlay}>
        <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Edit User</h3>
            <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    placeholder="Enter name"
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    placeholder="Enter email"
                    style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditChange}
                    placeholder="New password (optional)"
                    style={styles.input}
                />
            </div>
            <div style={styles.modalButtonGroup}>
                <button onClick={handleEditSave} style={styles.button}>Save</button>
                <button onClick={() => setEditUser(null)} style={styles.cancelButton}>Cancel</button>
            </div>
        </div>
    </div>
)}

            <div style={styles.container}>
                <h2 style={styles.title}>Users List</h2>



                <div style={styles.card}>
                    <h3>Users</h3>

                    {/* Column Headings */}
                    <div style={styles.userHeader}>
                        <div style={styles.userColumn}>Username</div>
                        <div style={styles.userColumn}>Email</div>
                        <div style={styles.userColumn}>Roles</div>
                        <div style={styles.userColumn}>Actions</div>
                    </div>

                    <ul style={styles.userList}>
                        {users.map(u => (
                            <li key={u.id} style={styles.userItem}>
                                <div style={styles.userColumn}><strong>{u.username}</strong></div>
                                <div style={styles.userColumn}>
                                    <span style={{ fontSize: '0.9rem', color: '#555' }}>{u.email}</span>
                                </div>
                                <div style={styles.userColumn}>
                                    {u.roles.length > 0 &&
                                        u.roles.map((role, index) => (
                                            <span key={index} style={{ fontSize: '0.9rem', color: '#555' }}>
                                                {role.name}
                                                {index < u.roles.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                </div>
                                <div style={styles.userColumn}>
                                    <button onClick={() => deleteUser(u._id)} style={styles.deleteButton}>
                                        Delete
                                    </button>
                                    {/* <div style={styles.userColumn}> */}
                                        {/* <button onClick={() => deleteUser(u._id)} style={styles.deleteButton}>Delete</button> */}
                                        <button onClick={() => handleEditClick(u)} style={styles.editButton}>Edit</button>
                                        {/* <button onClick={() => resetRoles(u._id)} style={styles.resetButton}>Reset Roles</button> */}
                                    {/* </div> */}

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
        // padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        // maxWidth: '600px',
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
        // padding: '1.5rem',
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
    },
    userHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        padding: '0.8rem',
        borderBottom: '2px solid #aaa',
        backgroundColor: '#efefef',
    },
    userColumn: {
        // flex: 1,
        // padding: '0 0.5rem',
    },
    editButton: {
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '0.5rem',
    },
    resetButton: {
        backgroundColor: '#9C27B0',
        color: 'white',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '0.5rem',
    },
    cancelButton: {
        backgroundColor: '#aaa',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        width: '400px',
    },
    modalTitle: {
        marginBottom: '1rem',
        fontSize: '1.5rem',
        color: '#333',
        textAlign: 'center',
    },
    
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
    },
    
    label: {
        marginBottom: '0.3rem',
        fontSize: '0.95rem',
        color: '#444',
        fontWeight: 'bold',
    },
    
    modalButtonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
    },
    
        

};

export default UserList;
