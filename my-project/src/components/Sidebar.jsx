// src/components/Sidebar.js
import React from 'react';
import { Layout, Menu } from 'antd';
import Category from "../services/Category.jsx"

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider width={200} className="site-layout-background" style={{ paddingTop: '20px',background:"white" }}>
            <Category />
        </Sider>
    );
};

export default Sidebar;
