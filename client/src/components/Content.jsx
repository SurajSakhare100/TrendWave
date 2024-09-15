export default function Content() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Sales Overview</h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h3 className="text-lg font-medium">Total Sales</h3>
                    <p className="text-2xl font-bold mt-2">$12,000</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h3 className="text-lg font-medium">Orders</h3>
                    <p className="text-2xl font-bold mt-2">300</p>
                </div>
                <div className="bg-white p-4 shadow-md rounded-md">
                    <h3 className="text-lg font-medium">New Customers</h3>
                    <p className="text-2xl font-bold mt-2">120</p>
                </div>
            </div>
        </div>
    );
}
