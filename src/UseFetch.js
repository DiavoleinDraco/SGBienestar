const UrlApi= "http://localhost:3000"

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
      const errorResponse = await response.json();
      const errorMessage = errorResponse?.message || 'Hubo un error en la solicitud.';

      if (errorMessage === 'ERROR: El Usuario ya existe') {
        throw new Error("El correo electrónico ya está en uso. Por favor, elija otro.");
      } else if (errorMessage === 'ERROR: Codigo de restablecimiento no valido') {
        throw new Error("El código proporcionado no es válido.");
      } else if (errorMessage === 'ERROR: El Usuario NO existe') {
        throw new Error("El usuario no existe. Verifique la información ingresada.");
      } else if (errorMessage === 'ERROR: Token invalido') {
        throw new Error("El codigo proporcionado no es valido, verifique e intente nuevamente");
      } else {
        throw new Error(errorMessage); 
      }
    }  

    return response.json();
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

  }