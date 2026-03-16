import type {JSX} from "react";

function AdminTopbar():JSX.Element {
    return (
        <header className="bg-white shadow px-8 py-4 flex justify-between">

            <input
                placeholder="Search..."
                className="border rounded px-4 py-2 w-64"
            />

            <div className="flex items-center gap-4">

        <span className="font-medium">
          Admin
        </span>

                <div className="h-8 w-8 rounded-full bg-gray-300" />

            </div>

        </header>
    );
}

export default AdminTopbar;