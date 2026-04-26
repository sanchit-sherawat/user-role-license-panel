import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/auth';
import { LogOut, Menu, User, Users, Plus, LayoutDashboard, Building, IdCard } from 'lucide-react';
import './SidebarLayout.css'; // Import external CSS
import { path } from 'framer-motion/client';
// import { Rule } from 'postcss';

const SidebarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = getUserFromToken();
  const navigate = useNavigate();
  let username = localStorage.getItem('username');
  let email = localStorage.getItem('email');
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    logo: null,
    description: '',
  });

  const handleCompanyChange = (e) => {
    const { name, value, files } = e.target;
    setCompanyForm({
      ...companyForm,
      [name]: files ? files[0] : value,
    });
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API)
    alert(`Company Name: ${companyForm.name}\nDescription: ${companyForm.description}`);
    setShowCompanyModal(false);
    setCompanyForm({ name: '', logo: null, description: '' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleroutechange = (e) => {
    navigate(e)
  }

  const navItems = user?.role === 'super_admin'
    ? [
      { name: 'Dashboard', path: '/super-admin', icon: <LayoutDashboard size={18} /> },
      { name: 'Create Company', path: '/super-admin#create', icon: <Building size={18} /> },
      { name: 'Assign License', path: '/super-admin#license', icon: <Users size={18} /> },
    ]
    : [
      { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
      { name: 'Users', path: '/userlist', icon: <Users size={18} /> },
      { name: 'Create User', path: '/userform', icon: <Plus size={18} /> },
      { name: 'Roles', path: '/roles', icon: <IdCard size={18} /> },
      // for query
      { name: 'Quarries Creation', path: '/quarryform', icon: <Building size={18} /> },

    ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!collapsed && <span className="sidebar-title">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="menu-button">
            <Menu />
          </button>
        </div>

        <nav className="nav-links">
          {navItems.map((item, idx) => (
            <Link key={idx} to={item.path} onClick={(item) => handleroutechange(item.path)} className="nav-item">
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="logout-section">
          <button onClick={logout} className="logout-button">
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <header className="main-header">
          <h1 className="welcome-title">Welcome, {username}</h1>
          <div className="user-info" style={{ cursor: 'pointer' }} onClick={() => setShowCompanyModal(true)}>
            <User />
            <span>{email}</span>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
      {showCompanyModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }}>
          <form
            onSubmit={handleCompanySubmit}
            style={{
              background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>Company Details</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label>Company Name</label>
              <input
                type="text"
                name="name"
                value={companyForm.name}
                onChange={handleCompanyChange}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleCompanyChange}
                style={{ width: '100%', marginTop: '0.3rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Description</label>
              <textarea
                name="description"
                value={companyForm.description}
                onChange={handleCompanyChange}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" onClick={() => setShowCompanyModal(false)} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
              <button type="submit" style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SidebarLayout;
