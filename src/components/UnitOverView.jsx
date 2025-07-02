// src/components/UnitOverview.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const recentTx = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 3500, expense: 2400 },
  { month: "Jun", income: 4200, expense: 1900 },
];

const sparklineData = [
  { x: 1, y: 400 },
  { x: 2, y: 300 },
  { x: 3, y: 500 },
  { x: 4, y: 200 },
  { x: 5, y: 600 },
  { x: 6, y: 450 },
];

const UnitOverview = () => {
  return (
    <div className="p-6 text-gray-800 font-sans space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Unit No: 101</h1>
        <p className="text-sm text-indigo-600">Status: Occupied</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        {[
          "Overview",
          "Financials",
          "Tickets",
          "Work Orders",
          "Attachments",
          "Listing",
          "Communications",
          "Legal",
          "Notes",
          "Inspections",
        ].map((tab) => (
          <button
            key={tab}
            className="pb-2 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-700"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Transactions Chart */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="font-medium mb-2">Recent Transactions</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recentTx}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  barCategoryGap={20}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="income" fill="#2563eb" />
                  <Bar dataKey="expense" fill="#93c5fd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rent/Sale Details */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="font-medium mb-2">Rent/Sale Details</div>
            <ul className="text-sm space-y-1">
              {[
                ["Rent Type", "Monthly"],
                ["Security Deposit", "AED 5,000"],
                ["Market Value", "AED 120,000"],
                ["Per Sq Foot", "AED 200"],
                ["Actual Rent", "AED 15,000/m"],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lease History Table */}
          <div className="bg-white p-4 shadow rounded-lg overflow-auto">
            <div className="font-medium mb-2">Lease History</div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Tenant", "Start Date", "End Date", "Rent"].map((h) => (
                    <th key={h} className="py-2 px-3 text-left text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["John Doe", "01-Jan-2023", "31-Dec-2023", "AED 12,000"],
                  ["Jane Smith", "01-Jan-2022", "31-Dec-2022", "AED 11,500"],
                ].map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    {row.map((cell, j) => (
                      <td key={j} className="py-2 px-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Financial Snapshot */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="font-medium mb-2">Financial Snapshot</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Rent</span>
                <span>AED 12,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Outstanding</span>
                <span className="text-red-600">AED 2,000</span>
              </div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <XAxis dataKey="x" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Occupancy & Facility & Completion */}
          <div className="bg-white p-4 shadow rounded-lg space-y-4">
            {/* Occupancy */}
            <div>
              <div className="font-medium mb-1">Occupancy Status</div>
              <div className="relative w-24 h-24 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeDasharray="75,100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  75%
                </div>
              </div>
            </div>

            {/* Facility Management */}
            <div>
              <div className="font-medium mb-1">Facility Management</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>

            {/* Completion Status */}
            <div>
              <div className="font-medium mb-1">Completion Status</div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-500 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
          </div>

          {/* Commission Snapshot */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="font-medium mb-2">Commission</div>
            <div className="space-y-2 text-sm">
              {[
                ["From Owner", "AED 1,200"],
                ["From Tenant", "AED 900"],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unit Information */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="font-medium mb-2">Unit Information</div>
            <ul className="text-sm space-y-1">
              {[
                ["Owner", "John Owner"],
                ["Property", "Sunset Villas"],
                ["Unit Type", "Studio"],
                ["Area", "500 sqft"],
                ["Floor", "2nd"],
                ["Furnishing", "Fully Furnished"],
              ].map(([label, val]) => (
                <li key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitOverview;
