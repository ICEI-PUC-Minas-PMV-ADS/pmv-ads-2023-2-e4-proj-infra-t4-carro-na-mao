import axios from "axios";

export function RecuperaToken (){
  const headers ={
      "content-type":"application/json"
  }
  
  const data={
      "nome":"master",
      "senha":"master123"
  }
   return axios.post('https://api-carronamao.azurewebsites.net/api/Cadastro/authenticate',data,{headers}).
    then(response=>{
      return response.data.jwtToken
      }).
      catch(error=>{
       console.error(error)
       throw error
      })
   
}