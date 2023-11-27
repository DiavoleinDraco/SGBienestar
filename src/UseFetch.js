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

  export async function eliminar (pat,parametro){
    try{

      const response= await fetch(UrlApi+pat+parametro,  {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      
      })
      const data= await response.json()
      return data
  
    } catch(error){
      console.log('No se encontro la informacion', error)
  
    }
  }

  export async function actualizar (pat,parametro,json){
    try{

      const response= await fetch(UrlApi+pat+parametro,  {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      
      })
      const data= await response.json() 
      console.log(JSON.stringify(json))
      return data
  
    } catch(error){
      console.log('No se encontro la informacion', error)
  
    }
  }

  export async function getMultipleParametre(pat, parametro1, parametro2) 
  { try {
    const response = await fetch(UrlApi + pat + parametro1 + parametro2, 
      { method: "GET",
    headers: {
    'Content-Type': 'application/json', },
    });

    if (response.ok) {
    const contentDisposition = response.headers.get('Content-Disposition'); const fileName = contentDisposition ? contentDisposition.split('filename=')
    [1] : null;
    const contentType = response.headers.get('Content-Type'); 
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob); 
    const link = document.createElement('a'); link.href = blobUrl;
    link.download = fileName || 'Informe';
    if (contentType && contentType.toLowerCase().includes('pdf')) { 
      link.download += '.pdf';
    } else if (contentType && contentType.toLowerCase().includes('xlsx')) 
    { link.download += '.xlsx';
    } else {
    console.warn('Tipo de archivo no reconocido:', contentType);
    }
    link.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100); } 
    
    else {
    console.error('Error en la solicitud:', response.status); }
    } catch (error) {
    console.error('No se encontro la informacion', error);
    } 
  
  }