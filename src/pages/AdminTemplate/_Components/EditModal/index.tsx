type PropsEditModal = {
    onClose?: () => void;
}

export default function EditModal({ onClose }: PropsEditModal) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-[400px]">

                <h2 className="text-lg font-semibold mb-4">
                    Edit User
                </h2>

                <input
                    placeholder="Name"
                    className="w-full border p-2 rounded mb-3"
                />

                <input
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-3"
                />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
}