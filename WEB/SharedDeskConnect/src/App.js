import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AboutUsPage from './Pages/AboutUsPage/AboutUsPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
      <Route path="/space-list" element={<AboutUsPage />} />
      <Route path="/list a space" element={<AboutUsPage />} />
      <Route path="/your-spaces" element={<AboutUsPage />} />
      <Route path="/your-rentals" element={<AboutUsPage />} />


      </Route>
    </Routes>
  </BrowserRouter>
  );
}


export default App;
