import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddItem from '../components/AddItem';  // Add item component
import ItemList from './ItemList';
import Analytics from './Analytics';
import Dashboard from './Dashboard';
import SettingsPage from './SettingsPage';
import Footer from '../components/Footer';
import OrderPage from './OrderPage';
import ShippingManagementPage from './ShippingManagementPage';

export default function AdminPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64">
                <div className="p-6">
                    {/* Admin Content that changes based on the route */}
                    <Routes>
                        <Route path="additem" element={<AddItem />} />
                        <Route path="inventory" element={<ItemList />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="orders" element={<OrderPage />} />
                        <Route path="ship" element={<ShippingManagementPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
