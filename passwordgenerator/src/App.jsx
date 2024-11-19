import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789";
    if(charAllowed) str+= "!#$%^~`&*(){}[]@+_-";

    
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1);

      pass+= str.charAt(char)
      
    }
    setPassword(pass)
  
  },
   [length,numAllowed,charAllowed,setPassword])
  
   const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
   },[password])
  
   useEffect(()=>{
  passwordGenerator()
   },[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>

 <div className="w-full- max-w-md mx-auto text-orange-500 px-4 py-4 my-8 bg-gray-600 rounded-lg shadow-md">
 <h1 className="text-4xl text-white text-center p-2">Password Generator</h1>
  <div className="flex shadow rounded-lg overflow-hidden mb-6">
    <input type="text" value={password} placeholder="password" readOnly ref={passwordRef} className="outline-none w-full py-1 px-3"/>
    <button onClick={copyPasswordToClipBoard} className="outline-none shadow-md  rounded-md py-2 px-2 bg-blue-700 text-white">COPY</button>
</div>
<div className="flex text-sm gap-x-2 ">
  <div className="flex items-center gap-x-1">
    <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
    <label>Length:{length}</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input className="rounded-md outline-none " type="checkbox" defaultChecked={numAllowed} id="numberInput" onChange={()=>{setNumAllowed(prev=>!prev)}}/>
    <label>Numbers</label>
  </div>
  <div className="flex items-center gap-x-1">
    <input className="rounded-md outline-none " type="checkbox" defaultChecked={charAllowed} id="numberInput" onChange={()=>{setCharAllowed(prev=>!prev)}}/>
    <label>Characters</label>
  </div>
</div>







 </div>
 </>
  )
}

export default App;