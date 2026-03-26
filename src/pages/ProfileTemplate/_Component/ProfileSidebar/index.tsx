import { useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import type { JSX } from 'react';

export default function ProfileSidebar(): JSX.Element {
  const { data: currentUser } = useSelector((state: RootState) => state.auth);

  const userName = currentUser?.user?.name ?? 'Guest User';
  const firstChar = userName.slice(0, 1).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded border p-6 text-center">
        <div className="relative inline-block">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold">
            {firstChar}
          </div>

          <span className="absolute bottom-0 right-0 rounded bg-green-100 px-2 py-1 text-xs text-green-600">
            Online
          </span>
        </div>

        <h2 className="mt-4 text-lg font-semibold">{userName}</h2>

        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <p>📍 From Vietnam</p>
          <p>👤 Member since May 2021</p>
        </div>
      </div>

      <div className="bg-white rounded border p-6">
        <div className="mb-3 flex justify-between">
          <h3 className="font-semibold">Description</h3>
          <button className="text-blue-500 text-sm">Edit</button>
        </div>

        <p className="text-sm text-gray-500">Add your description here</p>
      </div>

      <div className="bg-white rounded border p-6">
        <div className="mb-3 flex justify-between">
          <h3 className="font-semibold">Languages</h3>
          <button className="text-blue-500 text-sm">Add New</button>
        </div>

        <p className="text-sm text-gray-600">English - Basic</p>
      </div>

      <div className="bg-white rounded border p-6">
        <div className="mb-3 flex justify-between">
          <h3 className="font-semibold">Skills</h3>
          <button className="text-blue-500 text-sm">Add New</button>
        </div>

        <p className="text-sm text-gray-400">Add your skills</p>
      </div>
    </div>
  );
}