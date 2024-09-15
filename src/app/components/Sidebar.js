"use client";

import { ImExit } from "react-icons/im";

import React, { useState, useEffect } from "react";
import MenuComponent from "./MenuComponent";
import { MdFastfood } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import Link from "next/link";
import Cookies from "js-cookie";
import { IoIosArrowDown } from "react-icons/io";
import Modal from "./Modal";
import ModalOptionsLeft from "./ModalOptionsLeft";
import { useRouter } from "next/navigation";
import Image from "next/image";


function Sidebar({profile,email}) {
  const [role, setRole] = useState("");
 
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const router = useRouter();

  useEffect(() => {
    // Retrieve the role from cookies once the component mounts
    const roles = Cookies.get("role");
   
    setRole(roles || "");
    
  }, []); // Empty dependency array ensures this runs only once

  const handleOpenOptions = (event) => {
    const iconPosition = event.target.getBoundingClientRect();
    setModalPosition({ top: iconPosition.top, left: iconPosition.left });
    setShowModalOptions(true);
  };

  const handleCloseOptions = () => {
    setShowModalOptions(false);
  };

  const resetCookuies =  () =>{

    
    Cookies.remove("access_token");
      Cookies.remove("userId");
      Cookies.remove("profile");
      Cookies.remove("email");
      Cookies.remove("role");

      console.log("removido")

      router.push("/")
      
     




  }

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white flex flex-col">
      <ModalOptionsLeft
        show={showModalOptions}
        handleClose={handleCloseOptions}
        position={modalPosition}
      >
        <div  className="flex flex-col  text-black text-sm gap-1">
          <Link href="/profile" onClick={handleCloseOptions}>
            <p>Minha conta</p>
          </Link>
          <div onClick={resetCookuies} className="cursor-pointer">
            <p>Sair</p>
          </div>
        </div>
      </ModalOptionsLeft>

      <div className="flex  p-4   text-black text-lg items-center justify-center  ">
        <div className=" p-1 px-3  hover:border border-purple-700   flex  gap-5 rounded-md items-center">
          <div className="flex items-center justify-between gap-5">
          <div class="w-10 h-10  relative overflow-hidden border-gray-300 rounded-full flex items-center justify-center font-semibold text-base">
            <Image
            src={profile }
            alt="Profile picture"
            layout="fill"
            objectFit="cover"
            className=""
          />
            </div>
            <div className="text-xs">{email}</div>
          </div>

          <div onClick={handleOpenOptions}>
            <IoIosArrowDown className="text-purple-700 cursor-pointer" />
          </div>
        </div>
      </div>

      {role === "3" ||
        (role === "2" && (
          <div className="flex flex-col px-5 mt-1 gap-4">
            <p className="text-black text-sm">Gestão</p>
            <Link href="pedidos">
              <MenuComponent
                Icon={TbDeviceDesktopAnalytics}
                option="Gerenciar pedidos"
              />
            </Link>
          </div>
        ))}

      {role === "1" && (
        <div className="flex flex-col px-5 mt-5 gap-4">
          <p className="text-black text-sm">Cliente</p>
          <Link href="lojas">
            <MenuComponent
              Icon={TbDeviceDesktopAnalytics}
              option="Explorar lojas"
            />
          </Link>
        </div>
      )}
      {role === "3" ||
        (role === "2" && (
          <div className="flex flex-col px-5 mt-5 gap-4">
            <p className="text-black text-sm">Catálogo</p>
            <Link href="/produtos">
              <MenuComponent Icon={MdFastfood} option="Produtos" />
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
