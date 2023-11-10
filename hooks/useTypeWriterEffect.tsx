import { useEffect, useState } from 'react'

const useTypeWriterEffect = ({actual_text, speed} : any) => {
    const [textnow, setTextnow] = useState("")
    const [indexnow, setIndexnow] = useState(0)
    const [isforward, setIsforward] = useState(true)
    useEffect(()=>{
      const timeout = setTimeout(()=>{
          setTextnow(actual_text.substring(0, indexnow))
          if(isforward) setIndexnow(indexnow + 1)
          else setIndexnow(indexnow - 1)
          if(isforward && indexnow == actual_text.length){
              setIsforward(false)
          }
          if(!isforward && indexnow < 0){
              setIsforward(true)
          }
  
      }, speed);
      return ()=>{
          clearTimeout(timeout)
      }
    },[textnow, indexnow, isforward])
    return [textnow]
}

export default useTypeWriterEffect