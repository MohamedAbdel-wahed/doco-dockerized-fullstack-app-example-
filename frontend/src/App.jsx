import axios from 'axios'

import './App.css'
import { useEffect, useState } from 'react'



export default function App() {

  const [message, setMessage]= useState("")

  useEffect(()=> {
    (function(){
      axios.get('http://localhost:4004/')
      .then((res)=> setMessage(res.data.msg) )
      .catch((err)=> console.log(err) )
    })()

  }, [])
  

  return (
      <div>
        <h1>Welcome to my app!!</h1>
        {message ?? ""}
      </div>
  )
}

