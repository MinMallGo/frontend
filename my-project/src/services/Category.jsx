import {Uris} from "./Public.jsx"
import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import {postData} from "./Req.jsx";

const url = Uris.category.group
// 展示左边的分类菜单
export default function Category() {
    const cateUri = Uris.category;
    const uri = cateUri.group + cateUri.action.search;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await postData(uri, {
                    "name": "手机",
                    "page": 1,
                    "size": 100,
                });

                // 检查数据是否存在，并处理
                if (response && response.data) {
                    const menuItems = response.data.data.map(item => ({
                        label: item.name,
                        key: item.id.toString(),
                    }));
                    setItems(menuItems); // 更新菜单项
                }

                setLoading(false); // 请求完成
            } catch (error) {
                setError('请求失败，请重试！' + error);
                setLoading(false); // 请求完成
            }
        };

        fetchData(); // 发起请求
    }, []); // 只在组件挂载时执行

    // 如果正在加载，显示加载中的提示
    if (loading) {
        return <div>加载中...</div>;
    }

    // 如果发生错误，显示错误信息
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
        />
    );
}
