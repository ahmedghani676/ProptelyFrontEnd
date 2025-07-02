import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditUnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unitNo: "",
    status: "",
    propertyId: "",
    landlordId: "",
  });

  const [properties, setProperties] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/units/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          unitNo: data.unitNo || "",
          status: data.status || "",
          propertyId: data.propertyId?.toString() || "",
          landlordId: data.landlordId?.toString() || "",
        });
      })
      .catch(() => setSubmitError("Failed to load unit data."));

    fetch("http://localhost:3001/properties")
      .then((res) => res.json())
      .then(setProperties);

    fetch("http://localhost:3001/landlords")
      .then((res) => res.json())
      .then(setLandlords);
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.unitNo.trim()) newErrors.unitNo = "Unit number is required.";
    if (!form.status.trim()) newErrors.status = "Status is required.";
    if (!form.propertyId) newErrors.propertyId = "Select a property.";
    if (!form.landlordId) newErrors.landlordId = "Select a landlord.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/units/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitNo: form.unitNo,
          status: form.status,
          propertyId: Number(form.propertyId),
          landlordId: Number(form.landlordId),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      navigate("/units");
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Unit</h2>
      {submitError && <p className="text-red-600 mb-3">{submitError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Unit Number</label>
          <input
            type="text"
            name="unitNo"
            value={form.unitNo}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.unitNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.unitNo && (
            <p className="text-red-500 text-sm">{errors.unitNo}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Property</label>
          <select
            name="propertyId"
            value={form.propertyId}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.propertyId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Property</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.propertyId && (
            <p className="text-red-500 text-sm">{errors.propertyId}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Landlord</label>
          <select
            name="landlordId"
            value={form.landlordId}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.landlordId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Landlord</option>
            {landlords.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          {errors.landlordId && (
            <p className="text-red-500 text-sm">{errors.landlordId}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};
