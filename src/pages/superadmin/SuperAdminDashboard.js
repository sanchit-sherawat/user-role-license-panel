import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdminDashboard.css';
import SidebarLayout from './SidebarLayout';
import { FaBuilding, FaUsers, FaKey, FaListAlt } from 'react-icons/fa';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Create Company',
      description: 'Add a new company to the system',
      icon: <FaBuilding className="card-icon" />,
      route: '/super/userform',
    },
    {
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: <FaUsers className="card-icon" />,
      route: '/super/userlist',
    },
    {
      title: 'Assign License',
      description: 'Assign licenses to companies',
      icon: <FaKey className="card-icon" />,
      route: '/super/license',
    },
    {
      title: 'View Companies',
      description: 'See all registered companies',
      icon: <FaListAlt className="card-icon" />,
      route: '/super/licenselist',
    },

  ];

  return (
    <SidebarLayout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">🚀 Super Admin Dashboard</h2>
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

export default SuperAdminDashboard;
