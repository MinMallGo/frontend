import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
