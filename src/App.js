import './App.css';
import { useRef, useState,useEffect } from 'react';
import SocketIo from "socket.io-client"

function App() {
  const [channel,setChannel]=useState("");
  const sockerRef=useRef(null);

  useEffect(() => {
    sockerRef.current=new SocketIo("DEPLOYED_URL")

    return ()=>{
      sockerRef.current.off(channel);
      sockerRef.current.off('disconnect');
    }
  }, [])

  useEffect(() => {
   if(channel&&sockerRef.current){
    console.log(channel)
    sockerRef.current.on(channel,(data)=>{
      console.log(data)
    })
   
   }
  }, [channel])

  const handleChange=(e)=>{
    sockerRef?.current?.off(channel);
    setChannel(e.target.value)
  }
  
  return (
    <select onChange={handleChange}>
       <option value={"OPTIONS_FLOW"}>OPTIONS_FLOW </option>
       <option value={"POLITICIANS"}>POLITICIANS </option>
       <option value={"INSIDERS"}>INSIDERS </option>
       <option value={"ANALYST_RATINGS"}>ANALYST_RATINGS </option>
       <option value={"LOBBYING"}>LOBBYING</option>
       <option value={"GOVERNMENT_CONTRACTS"}>GOVERNMENT_CONTRACTS</option>
       <option value={"PUSH_FEEDS"}>PUSH_FEEDS  </option>
    </select>
  );
}

export default App;
