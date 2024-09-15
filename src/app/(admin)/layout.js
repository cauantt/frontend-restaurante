'use client'
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation"; 
import Cookies from 'js-cookie'; 
import { ResetCookiesProvider } from "../components/ResetCookiesContext";
import { api } from "../services/api";



export default function RootLayout({ children }) {
  const router = useRouter(); 

  const [userid, setUserid] = useState("");
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

 
 
 
  
  useEffect(() => {
    const savedUserId = Cookies.get('userId');
    const savedToken = Cookies.get('access_token');
    const savedProfile = Cookies.get('profile');
    const savedEmail = Cookies.get('email')
   
    if (!savedToken) router.push('/');
    
    
    setToken(savedToken);
    setUserid(savedUserId);
    setProfile(savedProfile);
    setEmail(savedEmail);

  }, [router]);

  async function resetCookies(path) {
    try {

      console.log("resetando")

      const response = await api.get(`/users/${userid}`);
      const data = response.data;
      
      Cookies.set('email', data.email, { expires: 15/24, secure: true });
      Cookies.set('profile', data.path, { expires: 15/24, secure: true });

      const savedProfile = Cookies.get('profile');
      const savedEmail = Cookies.get('email');
      setProfile(savedProfile);
      setEmail(savedEmail);
    } catch (error) {
      console.error(error);
    }
  }

  function Logout() {
    Cookies.remove('user_id');
    Cookies.remove('access_token');
    router.push('/');
  }
  
  return (

    <ResetCookiesProvider resetCookies={resetCookies}>
    <div className="flex flex-row h-screen">
      <Sidebar profile={profile} email={email} />
      <div className="ml-64 flex-1 overflow-y-auto bg-gray-100 px-6 py-5">
      
        
        {children}
      </div>
    </div>
    </ResetCookiesProvider>
  );
}
