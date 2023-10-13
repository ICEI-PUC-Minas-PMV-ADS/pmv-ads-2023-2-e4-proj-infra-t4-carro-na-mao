import axios from "axios";
import React from "react";


export function RecuperaToken (){
  const headers ={
      "content-type":"application/json"
  }
  
  const data={
      "nome":"torugo",
      "senha":"123"
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