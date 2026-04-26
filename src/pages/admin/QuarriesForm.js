import { useState } from 'react';
import SidebarLayout from './SidebarLayout';

const initialState = {
  name: '',
  value: '',
  address: '',
  latitude: '',
  longitude: '',
  imageUrl: '',
  refId: '',
};

function QuarriesForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append('file', imageFile);

    setUploading(true);
    try {
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploading(false);
      return data?.url;
    } catch (err) {
      setUploading(false);
      return null;
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.value.trim()) newErrors.value = 'Value is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.latitude || isNaN(Number(form.latitude))) newErrors.latitude = 'Latitude must be a number';
    if (!form.longitude || isNaN(Number(form.longitude))) newErrors.longitude = 'Longitude must be a number';
    if (!form.refId.trim()) newErrors.refId = 'Ref ID is required';
    if (!form.imageUrl.trim()) newErrors.imageUrl = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imageUrl && imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      } else {
        setErrors({ ...errors, imageUrl: 'Image upload failed' });
        return;
      }
    }

    const isValid = validate();
    if (!isValid) return;

    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      const res = await fetch('/quarries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg('✅ Quarry created successfully!');
        setForm(initialState);
        setImageFile(null);
        setErrors({});
      } else {
        setSuccessMsg('');
      }
    } catch (err) {
      setSuccessMsg('');
    }
  };

  return (
    <SidebarLayout>
      <div style={styles.card}>
        <h2 style={styles.heading}>🪨 Add New Quarry</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Input name="name" label="Name" value={form.name} onChange={handleChange} error={errors.name} />
          <Input name="value" label="Value" value={form.value} onChange={handleChange} error={errors.value} />
          <Input name="address" label="Address" value={form.address} onChange={handleChange} error={errors.address} />
          <Input name="latitude" label="Latitude" type="number" value={form.latitude} onChange={handleChange} error={errors.latitude} />
          <Input name="longitude" label="Longitude" type="number" value={form.longitude} onChange={handleChange} error={errors.longitude} />
          <Input name="refId" label="Reference ID" value={form.refId} onChange={handleChange} error={errors.refId} />

          <div style={styles.uploadBlock}>
            <label style={styles.label}>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInput} />
            {uploading && <p style={styles.uploading}>Uploading...</p>}
            {errors.imageUrl && <span style={styles.error}>{errors.imageUrl}</span>}
            {form.imageUrl && <img src={form.imageUrl} alt="Preview" style={styles.preview} />}
          </div>

          <button type="submit" style={styles.submitBtn}>📤 Submit</button>
          {successMsg && <p style={styles.success}>{successMsg}</p>}
        </form>
      </div>
    </SidebarLayout>
  );
}

function Input({ name, label, value, onChange, error, type = 'text' }) {
  return (
    <div style={styles.inputBlock}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          ...styles.input,
          borderColor: error ? '#e53935' : '#ccc',
        }}
      />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
}

const styles = {
  card: {
    maxWidth: '600px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.4rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: '#555',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1.5px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  fileInput: {
    fontSize: '0.9rem',
    padding: '0.4rem 0',
  },
  preview: {
    marginTop: '1rem',
    maxHeight: '220px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  error: {
    color: '#e53935',
    fontSize: '0.85rem',
    marginTop: '0.2rem',
  },
  success: {
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '1rem',
  },
  uploading: {
    fontSize: '0.85rem',
    color: '#777',
  },
  submitBtn: {
    padding: '0.9rem',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background 0.2s ease',
  },
  uploadBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default QuarriesForm;
