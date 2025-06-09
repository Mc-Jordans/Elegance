import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
// import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import OrderOnline from './pages/OrderOnline';
import Locations from './pages/Locations';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Reservations from './pages/admin/Reservations';
import ContentManagement from './pages/admin/ContentManagement';
import Analytics from './pages/admin/Analytics';

// Auth Pages
import ResetPassword from './pages/auth/ResetPassword';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="order-online" element={<OrderOnline />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="locations" element={<Locations />} />
          <Route path="feedback" element={<Feedback />} />
          // In App.tsx, add this route
         < Route path="/profile" element={<ProfilePage />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;