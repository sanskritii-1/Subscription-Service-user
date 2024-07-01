import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export function useSendData2() {
  const navigate = useNavigate();

  async function sendData(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    authBool: boolean,
    payload?: object,
  ) {
    try {
      const token = localStorage.getItem('token');
      let headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if authBool is true and token is present
      if (token && authBool) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:7001/api/${path}`, {
        method: method,
        headers: headers,
        body: payload ? JSON.stringify(payload) : undefined,
      });

      // Handle unauthorized access (401)
      if (response.status === 401) {
        toast.error('Unauthorized Access');
        navigate('/login');
        return;
      }

      const data = await response.json();
      console.log('data received util: ', data);

      // Handle general error responses
      if (!response.ok) {
        toast.error(data.message || 'An error occurred');
        throw new Error(data.message || 'An error occurred');
      }

      // Handle success messages
      if (data.status === 'ok' && data.result?.message) {
        toast.success(data.result.message);
      }

      return data;
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'An unexpected error occurred');
      throw err;
    }
  }

  return sendData;
}
