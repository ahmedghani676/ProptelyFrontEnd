import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = () => {
    setLoading(true);
    fetch("https://proptelybackend-production.up.railway.app:3001/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load properties");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await fetch(
          `https://proptelybackend-production.up.railway.app:3001/properties/${id}`,
          {
            method: "DELETE",
          }
        );
        fetchProperties();
      } catch (err) {
        setError("Failed to delete property");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Properties</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Location</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-t">
                  <td className="p-2">{property.name}</td>
                  <td className="p-2">{property.location}</td>
                  <td className="p-2 flex gap-2">
                    <Link
                      to={`/edit/${property.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
