import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function LeaseList() {
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/leases/")
      .then((res) => setLeases(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/leases/${id}`);
    setLeases((prev) => prev.filter((lease) => lease.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leases</h2>
      <ul>
        {leases.map((lease) => (
          <li
            key={lease.id}
            className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow"
          >
            <div>
              📝 Tenant ID: {lease.tenantId} | Unit ID: {lease.unitId} | Rent:{" "}
              {lease.rent}
            </div>
            <div>
              <a
                href={`/leases/edit/${lease.id}`}
                className="text-blue-600 hover:underline mr-4"
              >
                Edit
              </a>
              <button
                onClick={() => handleDelete(lease.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
