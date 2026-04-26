import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import SidebarLayout from './SidebarLayout';

function RolesList() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const fetchUsers = async () => {
        const res = await axios.get('/roles');
        setUsers(res.data);
    };

    const createUser = async () => {
        await axios.post('/users', formData);
        setFormData({ name: '', email: '', password: '' });
        fetchUsers();
    };

    const deleteUser = async (id) => {
        await axios.delete(`/users/${id}`);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <SidebarLayout>
            <div style={styles.container}>
                <h2 style={styles.title}>Roles List</h2>



                <div style={styles.card}>
                    <h3>Users</h3>

                    {/* Column Headings */}
                    <div style={styles.userHeader}>
                        <div >Role name</div>
                        <div >Roles</div>
                        <div >Actions</div>
                    </div>

                    <ul style={styles.userList}>
                        {users.map(u => (
                            <li key={u.id} style={styles.userItem}>
                                <div style={styles.userColumn}><strong>{u.name}</strong></div>
                                <div style={styles.userColumn}>
                                    <span style={{ fontSize: '0.9rem', color: '#555' }}>{u.email}</span>
                                </div>
                                <div style={styles.userColumn}>
                                    {u.permissions.length > 0 &&
                                        u.permissions.map((role, index) => (
                                            <span key={index} style={{ fontSize: '0.9rem', color: '#555' }}>
                                                {role.name}
                                                {index < u.permissions.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                </div>
                                <div style={ {padding: '0 1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => deleteUser(u.id)} style={styles.deleteButton}>
                                        Delete
                                    </button>
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
        flex:0.3,
        // padding: '0 0rem',
      },
      
};

export default RolesList;
