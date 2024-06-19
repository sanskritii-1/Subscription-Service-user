

export async function sendData(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  authBool: boolean,
  payload?: object,
) {
  
  try {
    const token  = localStorage.getItem('token');
    let headers:HeadersInit={
      "Content-Type": "application/json",
    }
    if(token && authBool){
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`http://localhost:7001/api/${path}`, {
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
