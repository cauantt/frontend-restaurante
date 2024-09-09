'use client'
import Image from "next/image";
import { useState } from "react";
import { apiauth } from "./services/apiauth";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'; 

export default function Home() {


  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleSubmit = async (e) => {

    e.preventDefault();
    

    try {

      console.log(email,password);

      const response = await apiauth.post('auth/login' ,{


        email : email,
        password : password

      });


      const data =response.data;

      

// Ensure the token is stored as a string
      Cookies.set("access_token", String(data.access_token), { expires: 15/24, secure: true, path: '/' });

      Cookies.set("userId", data.userId, { expires: 15/24, secure: true });
      Cookies.set("profile", data.path, {expires : 15/24, secure : true});
      Cookies.set("email",data.email);
      Cookies.set("role", data.role);


   

    

      


     router.push("/dashboard");





    }
    catch(error) {

      console.log(error);

    }




  }


  return (
    <div className="bg-black flex justify-center items-center w-screen h-screen">

      <div className="bg-white w-96 h-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-20 justify-center items-center">

          <input onChange={(e) => setEmail(e.target.value)} type="text"  placeholder="Email" className="bg-gray-600 h-10 rounded-lg border-none p-1"></input>
          <input  onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Senha" className="bg-gray-600 h-10 rounded-lg border-none p-1"></input>
          <button className="bg-gray-600 h-10 w-20" >Enviar</button>


        </form>
      </div>
    


     
    </div>
  );
}
