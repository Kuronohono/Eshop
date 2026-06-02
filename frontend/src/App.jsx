import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/pages/HomePage'
import CategoryPage from './components/pages/CategoryPage'
import Brands from './components/pages/Brands'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './components/pages/Cart'
import Footer from './components/OtherComponents/Footer'
import Login from './components/pages/Authentication/Login'
import Register from './components/pages/Authentication/Register'
import UserProfilePage from './components/pages/MyAccountPage'
import ProductPage from './components/pages/ProductPage'
import VerificationPage from './components/pages/Authentication/VerificationPage'
import ScrollToTop from './components/ScrollToTop'
import StatusPage from './components/pages/StatusPage'
import Checkout from './components/pages/Checkout'
import Payment from './components/pages/Payment'

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/verification" element={<VerificationPage/>}/>
      <Route path="/my_account" element={<UserProfilePage/>}/>
      <Route path="/" element={<><Hero /><Products/></>}/>
      <Route path=":product" element={<ProductPage/>}/>
      <Route path="/Status" element={<StatusPage/>}/>
      <Route path=":gender/:category" element={<CategoryPage/>}/>
      <Route path="/Brands" element={<Brands/>}/>
      <Route path="/Brands/:brand" element={<CategoryPage/>}/>
      <Route path="/Status/:status" element={<CategoryPage/>}/>
      <Route path="/dress-style/:dressStyle" element={<CategoryPage/>}/>

      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/payment" element={<Payment/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;