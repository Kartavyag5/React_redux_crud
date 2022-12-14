/** @format */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import UsersList from "./components/usersList";
import Cart from "./components/Cart";
import Products from "./components/Products";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<UsersList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='*' element={<h1>Sorry!! Page not Found</h1>} />
        </Routes>
      </BrowserRouter>
      {/* <UsersList /> */}
    </div>
  );
}

export default App;
