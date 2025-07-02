import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import EditProperty from './components/EditProperty';

import { TenantList } from './components/TenantList';
import { TenantForm } from './components/TenantForm';
import { EditTenant } from './components/EditTenant';

import { LandlordList } from './components/LandLordList';
import { LandlordForm } from './components/LandLordForm';
import { EditLandlord } from './components/LandLordEdit';

import { UnitList } from './components/UnitList';
import { UnitForm } from './components/UnitForm';
import { EditUnit } from './components/EditUnit';

import { LeaseList } from './components/LeaseList';
import { LeaseForm } from './components/LeaseForm';
import { EditLease } from './components/LeaseEdit';
import { LeaseOverview } from './components/LeaseOverview';
import UnitOverView from './components/UnitOverView';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-100 text-gray-900 font-sans overflow-x-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow h-screen sticky top-0 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Proptely</h2>

          <nav className="flex flex-col gap-4 mb-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">🏠 Properties</Link>
            <Link to="/create" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Add Property</Link>
          </nav>

          <nav className="flex flex-col gap-4 mb-4">
            <Link to="/tenants" className="text-gray-700 hover:text-indigo-600 font-medium">👤 Tenants</Link>
            <Link to="/tenants/create" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Add Tenant</Link>
          </nav>

          <nav className="flex flex-col gap-4 mb-4">
            <Link to="/landlords" className="text-gray-700 hover:text-indigo-600 font-medium">👤 Landlords</Link>
            <Link to="/landlords/create" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Add Landlord</Link>
          </nav>

          <nav className="flex flex-col gap-4 mb-4">
            <Link to="/units" className="text-gray-700 hover:text-indigo-600 font-medium">📦 Units</Link>
            <Link to="/units/create" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Add Unit</Link>
            <Link to="/units/unitoverview" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Unit Overview</Link>

          </nav>

          <nav className="flex flex-col gap-4">
            <Link to="/leases" className="text-gray-700 hover:text-indigo-600 font-medium">📝 Leases</Link>
            <Link to="/leases/create" className="text-gray-700 hover:text-indigo-600 font-medium">➕ Add Lease</Link>
            <Link to="/leases/leaseoverview" className="text-gray-700 hover:text-indigo-600 font-medium">📊 Lease Overview</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white shadow p-4">
            <h1 className="text-xl font-semibold text-indigo-700">Dashboard</h1>
          </header>

          <main className="p-6">
            <Routes>
              {/* Property Routes */}
              <Route path="/" element={<PropertyList />} />
              <Route path="/create" element={<PropertyForm />} />
              <Route path="/edit/:id" element={<EditProperty />} />

              {/* Tenant Routes */}
              <Route path="/tenants" element={<TenantList />} />
              <Route path="/tenants/create" element={<TenantForm />} />
              <Route path="/tenants/edit/:id" element={<EditTenant />} />

              {/* Landlord Routes */}
              <Route path="/landlords" element={<LandlordList />} />
              <Route path="/landlords/create" element={<LandlordForm />} />
              <Route path="/landlords/edit/:id" element={<EditLandlord />} />

              {/* Unit Routes */}
              <Route path="/units" element={<UnitList />} />
              <Route path="/units/create" element={<UnitForm />} />
              <Route path="/units/edit/:id" element={<EditUnit />} />
              <Route path="/units/unitoverview" element={<UnitOverView />} />

              {/* Lease Routes */}
              <Route path="/leases" element={<LeaseList />} />
              <Route path="/leases/create" element={<LeaseForm />} />
              <Route path="/leases/edit/:id" element={<EditLease />} />
              <Route path="/leases/leaseoverview" element={<LeaseOverview />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
