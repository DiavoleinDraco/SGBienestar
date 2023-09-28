const UrlApi= "https://pruebas-l16n.onrender.com"

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
      const responseData = await response.json();

      if (responseData.message === 'ERROR: El Usuario ya existe') {
        throw new Error("El correo electrónico ya está en uso. Por favor, elija otro.")

      } else if(response.status === 404){
        throw new Error("Usuario no encontrado. Por favor, registrese.");

      } else if(response.status === 400){
        throw new Error("Los campos no están completados correctamente");

      } else if(response.status === 401){
        throw new Error("El correo institucional o la contraseña no coinciden");

      }else {
        throw new Error(`Error al realizar la solicitud: ${response.status}`);
      };
        
    };

    const data1 = await response.json();
    return data1;
    
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
}


export  async function getParametre (pat,parametro){
  try{

    const response= await fetch(UrlApi+pat+parametro)
    const data= await response.json()
    return data

  } catch(error){
    console.log('No se encontro la informacion', error)

  }
  };