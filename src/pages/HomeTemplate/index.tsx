import {Outlet} from 'react-router-dom';
import FooterHome from '@components/Footer';
import type {JSX} from 'react';
import NavbarMainPage from "@components/Navbar/page.tsx";

function HomeTemplate(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-white">
      <NavbarMainPage variant = 'HOME'/>
      <Outlet />
      <FooterHome />
    </div>
  );
}

export default HomeTemplate;