
type TAdminTable = {
    tableHeaders: string[]
}

export default function AdminTable({tableHeaders}: TAdminTable) {

    const data = [
        {id:1,name:"Nguyen Van A",email:"a@gmail.com",role:"User"},
        {id:2,name:"Tran Van B",email:"b@gmail.com",role:"Admin"},
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">

            <table className="w-full">

                <thead>
                <tr className="text-left border-b">
                    {tableHeaders.map(header => (
                        <th className="py-3">{header}</th>
                    ))}
                    {/*<th className="py-3">ID</th>*/}
                    {/*<th>Name</th>*/}
                    {/*<th>Email</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Actions</th>*/}

                </tr>
                </thead>

                <tbody>

                {data.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50"
                    >

                        <td className="py-3">{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>

                        <td className="flex gap-2 mt-2">

                            <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                Edit
                            </button>

                            <button className="px-3 py-1 bg-red-500 text-white rounded">
                                Delete
                            </button>

                        </td>

                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    );

}