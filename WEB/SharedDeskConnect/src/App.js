import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import { ListedSpacesPage } from './Pages/ListedSpacesPage/ListedSpacesPage';
import { ListYourSpacePage } from './Pages/ListYourSpacePage/ListYourSpacePage';
import { SpaceDetailsPage } from './Pages/SpaceDetailsPage/SpaceDetailsPage';
import { YourSpaces } from './Pages/YourSpaces/YourSpaces';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/listed-spaces" element={< ListedSpacesPage/>} />
      <Route path="/list-a-space" element={< ListYourSpacePage/>} />
      <Route path="/space-details/:id" element={<SpaceDetailsPage />} />

      <Route path="/your-spaces" element={<YourSpaces />} />
      <Route path="/your-rentals" element={<ListedSpacesPage />} />
    </Routes>
  </BrowserRouter>
  );
}


export default App;
