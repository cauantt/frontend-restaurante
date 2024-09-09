'use client'
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation"; 
import Cookies from 'js-cookie'; 
export default function RootLayout({ children }) {
  const router = useRouter(); 

  const [userid, setUserid] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    
   
  
    const savedToken = Cookies.get('access_token');
    const savedUserId = Cookies.get('user_id');
    const savedProfile = Cookies.get('profile');
  
   
  
    setToken(savedToken);
    setUserid(savedUserId);
    setProfile(savedProfile);
  
    if (!savedToken) {
      router.push('/'); // Redirect if no token found
    }
  }, [router]);
   
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
