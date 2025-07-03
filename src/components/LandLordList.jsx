import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, Routes, Route } from "react-router-dom";

export const LandlordList = () => {
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    fetch("https://proptelybackend-production.up.railway.app/landlords")
      .then((res) => res.json())
      .then((data) => setLandlords(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this landlord?")) {
      await fetch(
        `https://proptelybackend-production.up.railway.app/landlords/${id}`,
        {
          method: "DELETE",
        }
      );
      setLandlords(landlords.filter((l) => l.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Landlords</h2>
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
            {landlords.map((landlord) => (
              <tr key={landlord.id} className="border-t">
                <td className="p-2">{landlord.name}</td>
                <td className="p-2">{landlord.contact}</td>
                <td className="p-2 flex gap-4">
                  <Link
                    to={`/landlords/edit/${landlord.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(landlord.id)}
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
            to="/landlords/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Landlord
          </Link>
        </div>
      </div>
    </div>
  );
};
