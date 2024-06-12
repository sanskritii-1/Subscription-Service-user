import { json, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function sendData(
  path: string,
  payload: object,
  authBool: boolean
) {
  let requestMethod: string = "GET";
  if (payload) {
    requestMethod = "POST";
  }
  const token  = localStorage.getItem('token');
  let headers={
    "Content-Type": "application/json",
    "Authorization":''
  }
  if(token && authBool){
    headers={
      "Content-Type": "application/json",
      "Authorization": token
    }
  }
  const response = await fetch(`http://localhost:5000/api/${path}`, {
    method: requestMethod,
    headers: headers,
    body: JSON.stringify(payload),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }
  const resData = await response.json();
  if (resData.token) {
    localStorage.setItem("token", resData.token);
  } else {
    toast.error('Authentication failed!');
  }
  return redirect("/");
}
