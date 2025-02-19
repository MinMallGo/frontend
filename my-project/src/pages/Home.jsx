// src/pages/Home.js
import React, {useEffect, useState} from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import HeaderComponent from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import {postData} from "../services/Req.jsx";
import {Uris} from "../services/Public.jsx";

const { Content } = Layout;

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');  // 默认类别为 "手机"
    const cateUri = Uris.spu;
    const uri = cateUri.group + cateUri.action.search;

    // 封装数据请求函数
    const fetchData = async (name) => {
        setLoading(true);  // 请求开始时，设置加载中
        try {
            const response = await postData(uri, {
                "name": name,  // 使用当前选择的类别
                "category_id":0,
                "page": 1,
                "size": 100,
            });

            if (response && response.data) {
                let tmp = []
                const pros = response.data.data.map(item => ({
                    id: item.id,
                    name: item.name.toString(),
                    price: item.desc + "" +1999,
                    imgUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
                    // onClick:() => handleCategoryChange(item.name)
                }));
                setProducts(pros);  // 更新菜单项
            }

            setLoading(false);  // 请求完成
        } catch (error) {
            setError('请求失败，请重试！');
            setLoading(false);  // 请求完成
        }
    };

    useEffect(() => {
        fetchData()
    }, []);


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
