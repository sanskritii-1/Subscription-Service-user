export async function sendData(path:string, email:string, password:string) {
  const response = await fetch(`http://localhost:5000/api/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if(!response.ok){
    throw new Error(`Failed to ${path}!`);
  }
  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  } else {
    alert(`${path} failed`);
  }
}
