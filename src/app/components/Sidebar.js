import React from 'react';
import MenuComponent from './MenuComponent';
import { MdFastfood } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import Link from 'next/link';

function Sidebar() {
  return (
    <div className='fixed top-0 left-0 h-screen w-64 bg-white flex flex-col'>
      <div className='flex flex-col px-5 mt-5 gap-4'>
        <p className='text-black text-sm'>Gestão</p>
        <Link href="pedidos">
          <MenuComponent Icon={TbDeviceDesktopAnalytics} option="Gerenciar pedidos" />
        </Link>
      </div>
      <div className='flex flex-col px-5 mt-5 gap-4'>
        <p className='text-black text-sm'>Catálogo</p>
        <Link href="/produtos">
          <MenuComponent Icon={MdFastfood} option="Produtos" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
