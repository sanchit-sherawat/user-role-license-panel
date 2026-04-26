import { useState, useEffect } from 'react';
import SidebarLayout from './SidebarLayout';

const initialColors = [
  { name: 'Red', hex: '#ff0000' },
  { name: 'Green', hex: '#00ff00' },
  { name: 'Blue', hex: '#0000ff' },
];

function ColorListView() {
  const [colors, setColors] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', hex: '' });

  useEffect(() => {
    setColors(initialColors);
  }, []);

  const handleDelete = (idx) => setColors(colors.filter((_, i) => i !== idx));

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditForm(colors[idx]);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    if (!editForm.name.trim() || !/^#[0-9A-Fa-f]{6}$/.test(editForm.hex)) {
      alert('Enter a valid name and hex (e.g., #ff0000)');
      return;
    }
    const updatedColors = [...colors];
    updatedColors[idx] = { ...editForm };
    setColors(updatedColors);
    setEditIdx(null);
    setEditForm({ name: '', hex: '' });
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditForm({ name: '', hex: '' });
  };

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>🎨 Color Palette</h2>
        <div style={styles.card}>
          {colors.length > 0 ? (
            <ul style={styles.list}>
              {colors.map((color, idx) => (
                <li key={idx} style={styles.listItem}>
                  <div style={{ ...styles.colorBox, backgroundColor: color.hex }} />
                  {editIdx === idx ? (
                    <div style={styles.editForm}>
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        placeholder="Name"
                        style={styles.input}
                      />
                      <input
                        name="hex"
                        value={editForm.hex}
                        onChange={handleEditChange}
                        placeholder="#000000"
                        style={styles.input}
                      />
                      <div style={styles.buttonGroup}>
                        <button onClick={() => handleEditSave(idx)} style={styles.buttonPrimary}>Save</button>
                        <button onClick={handleEditCancel} style={styles.buttonGray}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span style={styles.colorName}>{color.name}</span>
                      <span style={styles.hexCode}>{color.hex}</span>
                      <div style={styles.buttonGroup}>
                        <button onClick={() => handleEditClick(idx)} style={styles.buttonPrimary}>Edit</button>
                        <button onClick={() => handleDelete(idx)} style={styles.buttonDanger}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: 'center' }}>No colors found.</p>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.75rem'
  },
  colorBox: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  colorName: {
    fontWeight: 'bold',
    flex: '1'
  },
  hexCode: {
    color: '#666',
    flex: '0.5'
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  buttonPrimary: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buttonDanger: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  buttonGray: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  input: {
    padding: '0.4rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100px'
  },
  editForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
};

export default ColorListView;
