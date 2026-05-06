import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Products from './components/Products/Products'
import CategoryPage from './components/pages/CategoryPage'
import Brands from './components/pages/Brands'
import OnSale from './components/pages/OnSale'
import NewArrivals from './components/pages/NewArrivals'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/Home" element={<><Hero /><Products/></>}/>
      <Route path="/:category" element={<CategoryPage/>}/>
      <Route path="/on_sale" element={<OnSale/>}/>
      <Route path="/new_arrivals" element={<NewArrivals/>}/>
      <Route path="/brands" element={<Brands/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;