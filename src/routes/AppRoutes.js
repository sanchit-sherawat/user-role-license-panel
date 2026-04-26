import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserList from '../pages/admin/UserList';
import UserForm from '../pages/admin/UserForm'
import RolesList from '../pages/admin/RolesList';
import AdminRolesList from '../pages/superadmin/RolesList';
import AdminUserList from '../pages/superadmin/UserList';
import AdminUserForm from '../pages/superadmin/UserForm';
import LicenseManager from '../pages/superadmin/LicenseUi';
import LicenseList from '../pages/superadmin/LicenseList';
import EditLicense from '../pages/superadmin/EditLicense';
import ColorList from '../pages/superadmin/ColorList';
import ColorListView from '../pages/superadmin/ColorListView';
import QuarriesForm from '../pages/admin/QuarriesForm';

// import { getUserFromToken } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
//   const user = getUserFromToken();
//   if (!user) return <Navigate to="/" />;
//   if (role && user.role !== role) return <Navigate to="/" />;
//   return children;
};

function AppRoutes() {
  return (
    <BrowserRouter>
    {/* <h1>My App</h1>÷ */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/super-admin" element={
        //   <ProtectedRoute role="super_admin">÷
            <SuperAdminDashboard />
        //   </ProtectedRoute>
        } />
         <Route path="/super/userform" element={
        //   <ProtectedRoute role="admin">
            // <AdminDashboard />
            <AdminUserForm/>
        //   </ProtectedRoute>
        } />
        <Route path="/super/userlist" element={
        //   <ProtectedRoute role="admin">
            <AdminUserList/>
        //   </ProtectedRoute>
        } />
        <Route path="/super/roles" element={
        //   <ProtectedRoute role="admin">
            <AdminRolesList />  
        }/>
         <Route path="/super/license" element={
        //   <ProtectedRoute role="admin">
            <LicenseManager/>
        }/>
           <Route path="/super/licenselist" element={
        //   <ProtectedRoute role="admin">
            <LicenseList/>
        }/>
        <Route path="/super/edit-license/:id" element={<EditLicense />} />


        <Route path="/super/rolepermision" element={
        //   <ProtectedRoute role="admin">
            <AdminDashboard />
        //   </ProtectedRoute>
        } />
        <Route path="/super/colorlist" element={
        //   <ProtectedRoute role="admin">
            <ColorList />
        //   </ProtectedRoute>
        } />
        <Route path='/super/colorlistview' element={
            <ColorListView/>
        }/>
        {/* <Route path="/super-admin/create" element={
        //   <ProtectedRoute role="super_admin">
            <AdminUserForm />
        //   </ProtectedRoute>
        } /> */}

        {/* =============================admin start==================== */}
        <Route path="/admin" element={
        //   <ProtectedRoute role="admin">
            <AdminDashboard />
        //   </ProtectedRoute>
        } />
        <Route path="/quarryform" element={
        //   <ProtectedRoute role="admin">
            <QuarriesForm />
        //   </ProtectedRoute>
        } />
        <Route path="/userform" element={
        //   <ProtectedRoute role="admin">
            // <AdminDashboard />
            <UserForm/>
        //   </ProtectedRoute>
        } />
        <Route path="/userlist" element={
        //   <ProtectedRoute role="admin">
            <UserList />
        //   </ProtectedRoute>
        } />
        <Route path="/roles" element={
        //   <ProtectedRoute role="admin">
            <RolesList />  
        }/>
        <Route path="/rolepermision" element={
        //   <ProtectedRoute role="admin">
            <AdminDashboard />
        //   </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
