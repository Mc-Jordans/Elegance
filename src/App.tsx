import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import OrderOnline from './pages/OrderOnline';
import Locations from './pages/Locations';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Reservations from './pages/admin/Reservations';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import ContentManagement from './pages/admin/ContentManagement';
import Analytics from './pages/admin/Analytics';

function App() {
  return (
    <Routes>
      {/* Main Site Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<OrderOnline />} />
        <Route path="locations" element={<Locations />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;