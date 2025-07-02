import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function EditLease() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tenantId: "",
    unitId: "",
    rent: "",
    deposit: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/leases/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => setSubmitError("Failed to load lease data"));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.tenantId.trim()) newErrors.tenantId = "Tenant ID is required.";
    if (!form.unitId.trim()) newErrors.unitId = "Unit ID is required.";
    if (!form.rent.trim()) newErrors.rent = "Rent is required.";
    if (!form.deposit.trim()) newErrors.deposit = "Deposit is required.";
    if (!form.startDate.trim()) newErrors.startDate = "Start Date is required.";
    if (!form.endDate.trim()) newErrors.endDate = "End Date is required.";
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
      await axios.put(`http://localhost:3001/leases/${id}`, form);
      navigate("/leases");
    } catch (error) {
      setSubmitError("Failed to update lease");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const fieldLabel = {
    tenantId: "Tenant ID",
    unitId: "Unit ID",
    rent: "Rent",
    deposit: "Deposit",
    startDate: "Start Date",
    endDate: "End Date",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Lease</h2>
      {submitError && (
        <p className="text-red-600 mb-4 text-sm">{submitError}</p>
      )}

      {Object.keys(form).map((key) => (
        <div className="mb-4" key={key}>
          <label className="block text-gray-700 font-medium mb-1">
            {fieldLabel[key]}
          </label>
          <input
            type={key.includes("Date") ? "date" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors[key] ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors[key] && (
            <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        Update Lease
      </button>
    </form>
  );
}
