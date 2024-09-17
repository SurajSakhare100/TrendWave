import { FiHome, FiShoppingCart, FiUsers, FiBarChart2, FiSettings, FiPlus, FiArchive } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="h-screen w-64 dark:bg-gray-800 dark:text-white bg-white text-black  border fixed">
          
            <ul className="mt-8">
                <Link to="dashboard">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiHome className="mr-2" /> Dashboard
                    </li>
                </Link>
                <Link to="orders">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiShoppingCart className="mr-2" /> Orders
                    </li>
                </Link>
                <Link to="ship">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiUsers className="mr-2" /> Customers
                    </li>
                </Link>
                <Link to="analytics">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiBarChart2 className="mr-2" /> Analytics
                    </li>
                </Link>
                <Link to="inventory">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiArchive className="mr-2" /> My Inventory
                    </li>
                </Link>
                <Link to="additem">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiPlus className="mr-2" /> Add Item
                    </li>
                </Link>
                <Link to="settings">
                    <li className="px-4 py-2 hover:bg-blue-300 cursor-pointer flex items-center">
                        <FiSettings className="mr-2" /> Settings
                    </li>
                </Link>
            </ul>
        </div>
    );
}
