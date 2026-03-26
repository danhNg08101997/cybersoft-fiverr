import AdminTable from '@pages/AdminTemplate/_Components/AdminTable';
import type { JSX } from 'react';

function UserManagement(): JSX.Element {
  const tableHeaders = [
    'id',
    'name',
    'email',
    'phone',
    'birthday',
    'avatar',
    'gender',
    'role',
  ];

  const rows = [
    {
      id: 1,
      name: 'Nguyen Van A',
      email: 'a@gmail.com',
      phone: '0123456789',
      birthday: '01-01-2000',
      avatar: 'N/A',
      gender: 'male',
      role: 'USER',
    },
    {
      id: 2,
      name: 'Tran Van B',
      email: 'b@gmail.com',
      phone: '0987654321',
      birthday: '02-02-2000',
      avatar: 'N/A',
      gender: 'female',
      role: 'ADMIN',
    },
  ];

  return <AdminTable tableHeaders={tableHeaders} rows={rows} />;
}

export default UserManagement;