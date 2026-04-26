import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/auth';
import { LogOut, Menu, User, Users, Plus, LayoutDashboard, Building,IdCard ,KeyRound,View} from 'lucide-react';
import './SidebarLayout.css'; // Import external CSS
// import { Rule } from 'postcss';

const SidebarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = getUserFromToken();
  const navigate = useNavigate();
  let username = localStorage.getItem('username');
  let email = localStorage.getItem('email');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleroutechange = (e)=>{
    navigate(e)
  }

  const navItems = [
        { name: 'Dashboard', path: '/super-admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Create Company', path: '/super-admin#create', icon: <Building size={18} /> },
        { name: 'Assign License', path: '/super/license', icon: <Users size={18} /> },
        { name: 'Roles', path: '/super/roles', icon: <IdCard size={18} /> },
        { name: 'company User', path: '/super/userform', icon: <Plus size={18} /> },
        { name: 'company List', path: '/super/userlist', icon: <Users size={18} /> },
        { name: 'company role list', path: '/super/licenselist', icon: <KeyRound size={18} /> },
        {name: 'Color Picker', path: '/super/colorlist', icon: <Plus size={18} /> },
        {name: 'Color View List' ,path:'/super/colorlistview', icon: <view size={18}/>},

      ]

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
            <Link key={idx} to={item.path} onClick={(item)=>handleroutechange(item.path)} className="nav-item">
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
          <h1 className="welcome-title">Welcome, {username} </h1>
          <div className="user-info">
            <User />
            <span>{email}</span>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
