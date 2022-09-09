import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, Landing } from './pages';
import { ShareLayout } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShareLayout></ShareLayout>}>
          <Route index element={<Landing></Landing>}></Route>
          <Route path="/about" element={<About></About>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
