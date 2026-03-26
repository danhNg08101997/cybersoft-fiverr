import { Outlet } from 'react-router-dom';
import FooterHome from '@components/Footer';
import Navbar from '@components/Navbar';
import type { JSX } from 'react';

function HomeTemplate(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar variant="HOME" />
      <Outlet />
      <FooterHome />
    </div>
  );
}

export default HomeTemplate;