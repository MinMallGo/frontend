import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import DataTable from "./pages/Tables.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/userLogin" element={<DataTable />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
