import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import SidebarLayout from './SidebarLayout';
import { FaBuilding, FaUsers, FaKey, FaListAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Create User',
      description: 'Add a new User to the Company',
      icon: <FaBuilding className="card-icon" />,
      route: '/userform',
    },
    {
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: <FaUsers className="card-icon" />,
      route: '/userlist',
    },
    {
      title:'User Roles',
      description: 'Manage user roles and permissions',
      icon: <FaKey className="card-icon" />,
      route: '/roles',
    }

  ];

  return (
    <SidebarLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">🚀 Admin Dashboard</h2>
        <div className="card-grid">
          {dashboardItems.map((item, index) => (
            <div key={index} className="nav-card" onClick={() => navigate(item.route)}>
              <div className="card-header">
                {item.icon}
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminDashboard;
