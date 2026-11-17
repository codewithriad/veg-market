import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import WishlistPage from "./pages/WishlistPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import ProductFilterPage from "./pages/ProductFilterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductFilterPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
