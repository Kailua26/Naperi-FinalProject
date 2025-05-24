import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages

import Create from './pages/Create';
import Edit from './pages/Edit';

// Components
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

import BlogList from './components/BlogList';

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/new" element={<Create />} />
        <Route path="/blogs/:id/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
