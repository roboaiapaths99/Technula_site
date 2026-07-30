import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ChatbotWidget from './components/ChatbotWidget';
import FloatingActions from './components/FloatingActions';
import EvergreenPopup from './components/EvergreenPopup';
import CartDrawer from './components/CartDrawer';
import CursorBackground from './components/CursorBackground';
import Home from './pages/Home';
import About from './pages/About';
import SaasHome from './pages/SaasHome';
import Portfolio from './pages/Portfolio';
import AcademyHome from './pages/AcademyHome';
import Programs from './pages/Programs';
import Kits from './pages/Kits';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <CursorBackground />
          <Navbar />
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/saas" element={<SaasHome />} />
            <Route path="/saas/portfolio" element={<Portfolio />} />
            <Route path="/academy" element={<AcademyHome />} />
            <Route path="/academy/programs" element={<Programs />} />
            <Route path="/academy/kits" element={<Kits />} />
            <Route path="/academy/kits/:id" element={<ProductDetail />} />
            <Route path="/academy/cart" element={<Cart />} />
            <Route path="/academy/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <ChatbotWidget />
          <FloatingActions />
          <EvergreenPopup />
          <CartDrawer />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
    </HelmetProvider>
  );
}
