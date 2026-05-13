import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/pages/HomePage'
import CategoryPage from './components/pages/CategoryPage'
import Brands from './components/pages/Brands'
import OnSale from './components/pages/OnSale'
import NewArrivals from './components/pages/NewArrivals'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './components/pages/Cart'
import Footer from './components/OtherComponents/Footer'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import ShopPage from './components/pages/ShopPage'
import UserProfilePage from './components/pages/MyAccountPage'
import ProductPage from './components/pages/ProductPage'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/Home" element={<><Hero /><Products/></>}/>
      <Route path=":gender/:category" element={<CategoryPage/>}/>
      <Route path="/on_sale" element={<OnSale/>}/>
      <Route path="/new_arrivals" element={<NewArrivals/>}/>
      <Route path="/brands" element={<Brands/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/shop" element={<ShopPage/>}/>
      <Route path="/my_account" element={<UserProfilePage/>}/>
      <Route path=":product" element={<ProductPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;