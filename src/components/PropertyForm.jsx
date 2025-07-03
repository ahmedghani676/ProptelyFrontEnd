import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Property name is required.";
    if (!location.trim()) newErrors.location = "Location is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(
        "https://proptelybackend-production.up.railway.app/properties",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, location }),
        }
      );

      if (!res.ok) throw new Error("Failed to add property");
      navigate("/");
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Property</h2>
      {submitError && (
        <p className="text-red-600 mb-4 text-sm">{submitError}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setErrors((prev) => ({ ...prev, location: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
