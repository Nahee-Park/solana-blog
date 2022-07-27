import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../component/Home';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;