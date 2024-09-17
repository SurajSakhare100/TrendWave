import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaCog, FaSave, FaRegEdit } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto">

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg mb-8">
        <ul className="flex border-b">
          <li className={`w-1/4 text-center cursor-pointer py-4 ${activeTab === 'account' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`} onClick={() => handleTabChange('account')}>
            <FaUser className="inline-block mr-2" /> Account
          </li>
          <li className={`w-1/4 text-center cursor-pointer py-4 ${activeTab === 'security' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`} onClick={() => handleTabChange('security')}>
            <FaLock className="inline-block mr-2" /> Security
          </li>
          <li className={`w-1/4 text-center cursor-pointer py-4 ${activeTab === 'notifications' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`} onClick={() => handleTabChange('notifications')}>
            <FaBell className="inline-block mr-2" /> Notifications
          </li>
          <li className={`w-1/4 text-center cursor-pointer py-4 ${activeTab === 'preferences' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-600'}`} onClick={() => handleTabChange('preferences')}>
            <FaCog className="inline-block mr-2" /> Preferences
          </li>
        </ul>
      </div>

      {/* Settings Content */}
      {activeTab === 'account' && (
        <div className="bg-white  p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
              <input type="text" id="username" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Enter your username" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
              <input type="email" id="email" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Enter your email" />
            </div>
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white  p-6">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="current-password">Current Password</label>
              <input type="password" id="current-password" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Confirm new password" />
            </div>
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white  p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email-notifications">
                <input type="checkbox" id="email-notifications" className="mr-2" />
                Email Notifications
              </label>
              <p className="text-gray-600">Receive email notifications for updates and new features.</p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sms-notifications">
                <input type="checkbox" id="sms-notifications" className="mr-2" />
                SMS Notifications
              </label>
              <p className="text-gray-600">Receive SMS notifications for order updates and important alerts.</p>
            </div>
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="bg-white  p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="theme">Theme</label>
              <select id="theme" className="w-full border border-gray-300 rounded-lg p-3">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="language">Language</label>
              <select id="language" className="w-full border border-gray-300 rounded-lg p-3">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
