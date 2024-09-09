import axios from "axios";
import Cookies from 'js-cookie';

 const token = Cookies.get('access_token');

const api = axios .create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: `Bearer ${token}`
  }
});



export { api };
