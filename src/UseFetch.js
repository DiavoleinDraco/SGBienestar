const UrlApi= "https://proyecto-backend-sgbienestar.onrender.com"

export default async function get (pat){
try{
  
  const response= await fetch(UrlApi+pat)
  const data= await response.json()
  return data

} catch(error){
  console.log('No se encontro la informacion', error)

}

}
 
export async function post(pat, data) {
  try {
    const response = await fetch(UrlApi + pat, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      
      if (response.status === 'ERROR: El Usuario ya existe') {
        
        throw new Error("El correo electrónico ya está en uso. Por favor, elija otro.");
      } else {
        throw new Error(`Error al realizar la solicitud: ${response.status}`);
      }
    }

    const data1 = await response.json();
    return data1;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
}