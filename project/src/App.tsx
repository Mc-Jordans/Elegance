import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import OrderOnline from './pages/OrderOnline';
import Locations from './pages/Locations';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="order" element={<OrderOnline />} />
        <Route path="locations" element={<Locations />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;