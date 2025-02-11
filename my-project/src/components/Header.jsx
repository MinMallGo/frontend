// src/components/Header.js
import React from 'react';
import { Layout, Menu, Input, Row, Col, Button } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header style={{ background: '#fff', padding: '0 50px' }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>MinMall</div>
                </Col>
                <Col flex="auto">
                    <Input
                        placeholder="搜索商品"
                        prefix={<SearchOutlined />}
                        style={{ width: '300px' }}
                    />
                </Col>
                <Col>
                    <Button icon={<ShoppingCartOutlined />} size="large">
                        购物车
                    </Button>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
