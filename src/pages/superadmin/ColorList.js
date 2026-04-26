import { useState } from 'react';
import SidebarLayout from './SidebarLayout';

function ColorList() {
  const [colorForm, setColorForm] = useState({ name: '', hex: '' });
  const [colors, setColors] = useState([]);

  const handleColorChange = (e) => {
    setColorForm({ ...colorForm, [e.target.name]: e.target.value });
  };

  const handleAddColor = (e) => {
    e.preventDefault();
    if (!colorForm.name.trim() || !/^#[0-9A-Fa-f]{6}$/.test(colorForm.hex)) {
      alert('Please enter a valid color name and hex code (e.g. #ff0000)');
      return;
    }
    setColors([...colors, { ...colorForm }]);
    setColorForm({ name: '', hex: '' });
  };

  return (
    <SidebarLayout>
      <div style={styles.container}>
        <h2 style={styles.title}>Color Management</h2>
        <div style={styles.card}>
          <h3>Add Color</h3>
          <form onSubmit={handleAddColor} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Color Name"
              value={colorForm.name}
              onChange={handleColorChange}
              style={styles.input}
            />
            <input
              type="text"
              name="hex"
              placeholder="Hex Code (e.g. #ff0000)"
              value={colorForm.hex}
              onChange={handleColorChange}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Add Color</button>
          </form>
          {colors.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Colors List</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {colors.map((color, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '24px',
                      height: '24px',
                      backgroundColor: color.hex,
                      border: '1px solid #ccc',
                      marginRight: '0.75rem',
                      borderRadius: '4px'
                    }}></span>
                    <span style={{ marginRight: '0.5rem' }}>{color.name}</span>
                    <span style={{ color: '#888' }}>{color.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    color: 'black',
    maxWidth: '600px',
    padding: '2rem'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: 'black',
  },
  card: {
    background: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    padding: '2rem'
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
  }
};

export default ColorList;