import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddItem from '../components/AddItem';  // Add item component
// import ManageProducts from '../components/ManageProducts'; // Manage products component

export default function AdminPage() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64">
                <div className="p-6">
                    {/* Admin Content that changes based on the route */}
                    <Routes>
                        <Route path="add-item" element={<AddItem />} />
                        {/* <Route path="manage-products" element={<ManageProducts />} /> */}
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </div>
    );
}
