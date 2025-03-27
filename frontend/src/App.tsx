import './App.css';
import { CartProvider } from './context/CartContext';
import AddToCart from './Pages/AddToCart';
import CartPage from './Pages/CartPage';
import ProjectsPage from './Pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/cart/:title/:projectId" element={<AddToCart />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
    </CartProvider>

    </>
  );
}

export default App;
