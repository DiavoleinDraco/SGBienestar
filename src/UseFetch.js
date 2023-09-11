
const UrlApi= "https://prueba-ybo9.onrender.com"
export default async function get (pat){
try{
  
  const response= await fetch(UrlApi+pat)
  const data= await response.json()
  return data

} catch(error){
  console.log('No se encontro la informacion', error)

}

}
 