import { json } from "react-router-dom";
// import { toast } from "react-toastify";

// export async function sendData(
//   path: string,
//   payload: object,
//   authBool: boolean
// ) {
//   let requestMethod: string = "GET";
//   if (payload) {
//     requestMethod = "POST";
//   }
//   const token  = localStorage.getItem('token');
//   let headers={
//     "Content-Type": "application/json",
//     "Authorization":''
//   }
//   if(token && authBool){
//     headers={
//       "Content-Type": "application/json",
//       "Authorization": token
//     }
//   }
//   const response = await fetch(`http://localhost:5000/api/${path}`, {
//     method: requestMethod,
//     headers: headers,
//     body: JSON.stringify(payload),
//   });
//   if (response.status === 422 || response.status === 401) {
//     return response;
//   }
//   if (!response.ok) {
//     throw json({ message: "Could not authenticate user" }, { status: 500 });
//   }
//   const resData = await response.json();
//   if (resData.token) {
//     localStorage.setItem("token", resData.token);
//   } else {
//     toast.error('Authentication failed!');
//   }
// }



export async function sendData(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  authBool: boolean,
  payload?: object,
) {
  
  try {
    let headers:HeadersInit={
      "Content-Type": "application/json",
    }
    if(authBool){
      const token  = localStorage.getItem('token');
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`http://localhost:5001/api/${path}`, {
      method: method,
      headers: headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    console.log('response received util: ', response)
    const data = await response.json();
    console.log('data received util: ', data)

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
    
  } 
  catch (err) {
    console.log(err);
    throw err;
  }
}
