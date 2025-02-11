// src/pages/Home.js
import React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import HeaderComponent from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

const { Content } = Layout;

const Home = () => {
    const products = [
        { id: 1, name: 'iPhone 12', price: 6999, imgUrl: 'https://example.com/iphone12.jpg' },
        { id: 2, name: 'MacBook Pro', price: 12999, imgUrl: 'https://example.com/macbook.jpg' },
        { id: 3, name: 'AirPods Pro', price: 1999, imgUrl: 'https://example.com/airpods.jpg' },
        { id: 4, name: 'iPad Pro', price: 6999, imgUrl: 'https://example.com/ipad.jpg' },
    ];

    return (
        <Layout>
            <HeaderComponent />
            <Layout>
                <Sidebar />
                <Content style={{ padding: '0 50px', marginTop: 20 }}>
                    <Row gutter={[16, 16]}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
