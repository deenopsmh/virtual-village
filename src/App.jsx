import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';

import HomeNew from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roam from './pages/Roam/Roam';
import About from './pages/About/About';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route 
          path="/" 
          element={
            <div>
                <HomeNew/>
            </div>
          } 
          
        />
                <Route 
          path="/roam" 
          element={
            <div>
                <Roam/>
            </div>
          } 
          
        />
                <Route 
          path="/about" 
          element={
            <div>
                <About/>
            </div>
          } 
          
        />

                {/* <Route path="/about" element={<Home/>}/> */}
        {/* <Route path="/roam" element={<Roam/>}/>
        <Route path="/topics" element={<Home/>}/>
        <Route path="/maps" element={<Home/>}/> */}
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}