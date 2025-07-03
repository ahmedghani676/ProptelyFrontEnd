import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, Routes, Route } from "react-router-dom";

export const TenantList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetch("https://proptelybackend-production.up.railway.app/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      await fetch(
        `https://proptelybackend-production.up.railway.app/tenants/${id}`,
        {
          method: "DELETE",
        }
      );
      setTenants(tenants.filter((t) => t.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Tenants</h2>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="border-t">
                <td className="p-2">{tenant.name}</td>
                <td className="p-2">{tenant.contact}</td>
                <td className="p-2 flex gap-4">
                  <Link
                    to={`/tenants/edit/${tenant.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <Link
            to="/tenants/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Tenant
          </Link>
        </div>
      </div>
    </div>
  );
};
