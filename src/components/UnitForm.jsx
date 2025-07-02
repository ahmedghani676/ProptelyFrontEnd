import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UnitForm = () => {
  const [unitNo, setUnitNo] = useState("");
  const [status, setStatus] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [landlordId, setLandlordId] = useState("");
  const [properties, setProperties] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/properties")
      .then((res) => res.json())
      .then(setProperties);
    fetch("http://localhost:3001/landlords")
      .then((res) => res.json())
      .then(setLandlords);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!unitNo.trim()) newErrors.unitNo = "Unit number is required.";
    if (!status.trim()) newErrors.status = "Status is required.";
    if (!propertyId) newErrors.propertyId = "Property must be selected.";
    if (!landlordId) newErrors.landlordId = "Landlord must be selected.";
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
      const res = await fetch("http://localhost:3001/units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitNo,
          status,
          propertyId: Number(propertyId),
          landlordId: Number(landlordId),
        }),
      });
      if (!res.ok) throw new Error("Failed to create unit");
      navigate("/units");
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Unit</h2>
      {submitError && (
        <p className="text-red-600 mb-4 text-sm">{submitError}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Unit No */}
        <div>
          <label className="block mb-1 font-medium">Unit No</label>
          <input
            type="text"
            value={unitNo}
            onChange={(e) => {
              setUnitNo(e.target.value);
              setErrors((prev) => ({ ...prev, unitNo: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.unitNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.unitNo && (
            <p className="text-red-500 text-sm">{errors.unitNo}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setErrors((prev) => ({ ...prev, status: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* Property Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Property</label>
          <select
            value={propertyId}
            onChange={(e) => {
              setPropertyId(e.target.value);
              setErrors((prev) => ({ ...prev, propertyId: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.propertyId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Property</option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
          {errors.propertyId && (
            <p className="text-red-500 text-sm">{errors.propertyId}</p>
          )}
        </div>

        {/* Landlord Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Landlord</label>
          <select
            value={landlordId}
            onChange={(e) => {
              setLandlordId(e.target.value);
              setErrors((prev) => ({ ...prev, landlordId: "" }));
            }}
            className={`w-full border px-3 py-2 rounded ${
              errors.landlordId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Landlord</option>
            {landlords.map((land) => (
              <option key={land.id} value={land.id}>
                {land.name}
              </option>
            ))}
          </select>
          {errors.landlordId && (
            <p className="text-red-500 text-sm">{errors.landlordId}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};
