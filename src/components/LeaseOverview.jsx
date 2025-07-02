import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
];

export const LeaseOverview = () => {
  return (
    <div className="p-6 text-gray-800 font-sans">
      <div className="text-sm text-indigo-600 font-medium mb-1">
        Lease Status
      </div>
      <h1 className="text-xl font-semibold mb-6">
        Tenant Name | Property | Unit No
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        {[
          "Overview",
          "Residents",
          "Units",
          "Finance",
          "Requests/WO",
          "Checks",
          "Attachments",
          "Communication",
          "Legal",
          "Notes",
        ].map((tab) => (
          <button
            key={tab}
            className="py-2 px-4 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-700"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rental Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          "Contract Value",
          "Rent Income",
          "Received",
          "Receivable",
          "Unearned",
          "Upcoming Invoices",
          "Liability",
          "Overdues",
        ].map((title, index) => (
          <div
            key={title}
            className={`rounded-lg border p-4 ${
              ["Unearned", "Liability", "Overdues"].includes(title)
                ? "border-red-300 bg-red-50"
                : "border-blue-200 bg-blue-50"
            }`}
          >
            <div className="text-xs font-medium text-gray-500 mb-1">
              {title}
            </div>
            <div className="text-lg font-semibold text-gray-700">1.1m</div>
          </div>
        ))}
      </div>

      {/* Financial Stats & Lease Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="font-medium mb-2">Quick Financial Stats</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
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

        <div className="bg-white p-4 shadow rounded-lg">
          <div className="font-medium mb-2">Lease Information</div>
          <ul className="text-sm space-y-1">
            {[
              ["Tenant Name", "123"],
              ["Unit Name", "Studio - 01 (Used)"],
              ["Property", "Alex villa property"],
              ["Payment Cycle", "60"],
              ["Mode of Occupation", "01"],
              ["Start Date", "16-Dec-2023"],
              ["End Date", "16-Dec-2025"],
              ["No. of Payments", "6"],
              ["Rent", "100000"],
              ["Contract Signature by Tenant", "Yes"],
              ["Contract Signature by Owner", "No"],
            ].map(([label, value]) => (
              <li key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Commission Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="font-medium mb-2">Commission from Owner</div>
          <div className="h-4 bg-gray-200 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full text-xs text-white text-center"
              style={{ width: "60%" }}
            >
              60%
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="font-medium mb-2">Commission from Tenant</div>
          <div className="h-4 bg-gray-200 rounded-full">
            <div
              className="h-4 bg-blue-500 rounded-full text-xs text-white text-center"
              style={{ width: "80%" }}
            >
              80%
            </div>
          </div>
        </div>
      </div>

      {/* Scheduled Invoices */}
      <div className="bg-white p-4 shadow rounded-lg mb-6">
        <div className="font-medium mb-2">Scheduled Invoices</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              {[
                "Amount",
                "Scheduled On",
                "Due On",
                "Posted",
                "Status",
                "Paid Amount",
                "Balance",
                "Actions",
              ].map((header) => (
                <th key={header} className="py-2 px-3 text-left text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3">10000</td>
              <td className="py-2 px-3">27-Dec-2025</td>
              <td className="py-2 px-3">29-Dec-2025</td>
              <td className="py-2 px-3">✅</td>
              <td className="py-2 px-3 text-red-600">Unpaid</td>
              <td className="py-2 px-3">0.00</td>
              <td className="py-2 px-3">10000</td>
              <td className="py-2 px-3">[...]</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cheque List */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="font-medium mb-2">List of All Cheques</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              {[
                "Bank",
                "Check No.",
                "Check Date",
                "Amount (AED)",
                "Attachment",
                "Action",
              ].map((header) => (
                <th key={header} className="py-2 px-3 text-left text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3">HBL</td>
              <td className="py-2 px-3">100</td>
              <td className="py-2 px-3">01-Jan-2025</td>
              <td className="py-2 px-3">10,000</td>
              <td className="py-2 px-3">[Attachment]</td>
              <td className="py-2 px-3">[...]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
