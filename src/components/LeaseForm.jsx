import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LeaseForm = () => {
  const [units, setUnits] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    unitId: "",
    tenantId: "",
    rent: "",
    deposit: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/units").then((res) => setUnits(res.data));
    axios
      .get("http://localhost:3001/tenants")
      .then((res) => setTenants(res.data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.unitId) newErrors.unitId = "Unit is required";
    if (!formData.tenantId) newErrors.tenantId = "Tenant is required";
    if (!formData.rent || formData.rent <= 0)
      newErrors.rent = "Rent must be a positive number";
    if (!formData.deposit || formData.deposit < 0)
      newErrors.deposit = "Deposit must be a non-negative number";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    else if (formData.endDate < formData.startDate)
      newErrors.endDate = "End date cannot be before start date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post(
        "https://proptelybackend-production.up.railway.app:3001/leases",
        formData
      );
      navigate("/leases");
    } catch (error) {
      console.error("Error creating lease:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Add Lease</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block font-medium text-sm mb-1">Unit</label>
          <select
            name="unitId"
            value={formData.unitId}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.unitId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Unit</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.unitNo}
              </option>
            ))}
          </select>
          {errors.unitId && (
            <p className="text-red-500 text-sm mt-1">{errors.unitId}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Tenant</label>
          <select
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.tenantId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Tenant</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
          {errors.tenantId && (
            <p className="text-red-500 text-sm mt-1">{errors.tenantId}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Rent</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.rent ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter rent amount"
          />
          {errors.rent && (
            <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Deposit</label>
          <input
            type="number"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.deposit ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter deposit amount"
          />
          {errors.deposit && (
            <p className="text-red-500 text-sm mt-1">{errors.deposit}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Save Lease
          </button>
        </div>
      </form>
    </div>
  );
};
