import AdminTable from "@pages/AdminTemplate/_Components/AdminTable";

function UserManagement() {
    const tableHeaders: string[] = ["id", "name", "email", "phone", "birthday", "avatar", "gender", "role", "action"];
    return (
        <div>
            <AdminTable tableHeaders = {tableHeaders}/>
        </div>
    );
}

export default UserManagement;