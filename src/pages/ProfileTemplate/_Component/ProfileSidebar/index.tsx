import {useSelector} from "react-redux";
import type {RootState} from "@store/index.ts";

export default function ProfileSidebar() {

    const {data: currentUser} = useSelector((state: RootState) => state.loginReducer);


    return (
        <div className="space-y-6">

            {/* Profile card */}
            <div className="bg-white rounded border p-6 text-center">
                <div className="relative inline-block">
                    <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold">
                        {currentUser?.user?.name?.slice(0,1)}
                    </div>

                    <span className="absolute bottom-0 right-0 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
            Online
          </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold">{currentUser?.user?.name}</h2>

                <div className="mt-4 text-sm text-gray-500 space-y-2">
                    <p>📍 From Vietnam</p>
                    <p>👤 Member since May 2021</p>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded border p-6">
                <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">Description</h3>
                    <button className="text-blue-500 text-sm">Edit</button>
                </div>

                <p className="text-sm text-gray-500">
                    Add your description here
                </p>
            </div>

            {/* Languages */}
            <div className="bg-white rounded border p-6">
                <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">Languages</h3>
                    <button className="text-blue-500 text-sm">Add New</button>
                </div>

                <p className="text-sm text-gray-600">English - Basic</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded border p-6">
                <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">Skills</h3>
                    <button className="text-blue-500 text-sm">Add New</button>
                </div>

                <p className="text-sm text-gray-400">Add your skills</p>
            </div>

        </div>
    );
}