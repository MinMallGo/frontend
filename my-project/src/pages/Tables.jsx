import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Pagination } from 'antd';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    // 模拟获取数据的函数
    const fetchData = async (page, size) => {
        setLoading(true);
        // 在这里替换为您的数据获取逻辑
        const response = await fetch(`https://api.example.com/data?page=${page}&size=${size}`);
        const result = await response.json();
        setData(result.data);
        setTotal(result.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleSearch = (values) => {
        // 在这里处理搜索逻辑
        console.log('Search values:', values);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            <Form onFinish={handleSearch} layout="inline" style={{ marginBottom: 16 }}>
                <Form.Item name="name" label="Name">
                    <Input placeholder="Search by name" />
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <Input placeholder="Search by age" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={false}
                rowKey="id"
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger
                onShowSizeChange={handlePageChange}
                style={{ marginTop: 16, textAlign: 'right' }}
            />
        </div>
    );
};

export default DataTable;
