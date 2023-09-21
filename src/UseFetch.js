
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
 
export async function post (pat,data){
  try{
    
    const response= await fetch(UrlApi+pat,{method:"POST",headers: {
      'Content-Type': 'application/json', 
    }, body:JSON.stringify(data)})
    const data1= await response.json()
    return data1
  
  } catch(error){
    console.log('No se encontro la informacion', error)
  
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