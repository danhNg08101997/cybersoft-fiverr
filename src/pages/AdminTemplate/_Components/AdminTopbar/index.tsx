import type { JSX } from 'react';

function AdminTopbar(): JSX.Element {
  return (
    <header className="flex justify-between bg-white px-8 py-4 shadow">
      <input
        placeholder="Search..."
        className="w-64 rounded border px-4 py-2"
      />

      <div className="flex items-center gap-4">
        <span className="font-medium">Admin</span>
        <div className="h-8 w-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}

export default AdminTopbar;