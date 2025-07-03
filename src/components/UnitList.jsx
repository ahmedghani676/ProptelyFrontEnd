import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, Routes, Route } from "react-router-dom";

export const UnitList = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch("https://proptelybackend-production.up.railway.app:3001/units")
      .then((res) => res.json())
      .then((data) => setUnits(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      await fetch(
        `https://proptelybackend-production.up.railway.app:3001/units/${id}`,
        { method: "DELETE" }
      );
      setUnits(units.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Units</h2>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="p-2">Unit No</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-t">
                <td className="p-2">{unit.unitNo}</td>
                <td className="p-2">{unit.status}</td>
                <td className="p-2 flex gap-4">
                  <Link
                    to={`/units/edit/${unit.id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(unit.id)}
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
            to="/units/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            ➕ Add Unit
          </Link>
        </div>
      </div>
    </div>
  );
};
