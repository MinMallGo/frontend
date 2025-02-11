// src/components/ProductCard.js
import React from 'react';
import { Card, Col, Row } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductCard = ({ product }) => {
    return (
        <Col span={6} style={{ marginBottom: '20px' }}>
            <Card
                hoverable
                cover={<img alt={product.name} src={product.imgUrl} />}
                actions={[
                    <ShoppingCartOutlined key="add-to-cart" />,
                ]}
            >
                <Meta title={product.name} description={`￥${product.price}`} />
            </Card>
        </Col>
    );
};

export default ProductCard;
