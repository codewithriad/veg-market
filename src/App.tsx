import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import { SearchFilterPage } from "./pages/SearchFilterPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchFilterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
