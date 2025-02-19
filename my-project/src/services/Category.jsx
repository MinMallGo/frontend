import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import { postData } from './Req.jsx';
import {Uris} from "./Public.jsx";  // 假设你有一个封装好的 postData 方法

export default function Category() {
    const cateUri = Uris.category;
    const uri = cateUri.group + cateUri.action.search;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');  // 默认类别为 "手机"

    // 封装数据请求函数
    const fetchData = async (category) => {
        setLoading(true);  // 请求开始时，设置加载中
        try {
            const response = await postData(uri, {
                "name": "",  // 使用当前选择的类别
                "page": 1,
                "size": 100,
            });

            if (response && response.data) {
                const menuItems = response.data.data.map(item => ({
                    label: item.name,
                    key: item.id.toString(),
                    onClick:() => handleCategoryChange(item.name)
                }));
                setItems(menuItems);  // 更新菜单项
            }

            setLoading(false);  // 请求完成
        } catch (error) {
            setError('请求失败，请重试！');
            setLoading(false);  // 请求完成
        }
    };

    // 监听 selectedCategory 的变化，触发数据请求
    useEffect(() => {
        fetchData("");  // 每次 category 更新时重新请求
    }, []);  // 依赖项为 selectedCategory

    // 点击按钮切换类别
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);  // 更新选中的类别
    };

    // 如果正在加载，显示加载中的提示
    if (loading) {
        return <div>加载中...</div>;
    }

    // 如果发生错误，显示错误信息
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {/* 菜单 */}
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0, width: '200px' }}
                items={items}
            />
        </div>
    );
}
