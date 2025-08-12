"use client"

import { io } from "socket.io-client"
import { useEffect,useState } from "react"


const socket=io("http:52.47.124.190:3000")//Este es el de aws

export default function Chat(){
  const [chat,setChat]=useState<string[]>([])
  const [text,setText]=useState("")

  const handleForm=(e:React.FormEvent)=>{
    e.preventDefault()

    if(text){
      socket.emit("texto",text+" desde un socket")
      setText("")
    }
  }
  const handleText=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value)
  }

  useEffect(()=>{

    socket.on("texto",(valor:string)=>{
      setChat((prevChat)=>([...prevChat,valor]))
    })

  },[])
  return(
  <>
  <form onSubmit={handleForm}>
    <input type="text" value={text} onChange={handleText}/>
    <button>Enviar</button>
  </form>
  <h1>Esto sería el chat</h1>
  <h2>Los textos:</h2>
  <ol>
    {chat.map((item,index)=>{
      return(<li key={index}>{item}</li>)
    })}
  </ol>
  </>)
}