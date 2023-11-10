import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ProgressStatusBar() {
  const {status} = useSelector((state:any) => state.entities.userProgress);
  const [statnow, setStatnow] : any = useState()
  useEffect(()=>{
    setStatnow(status)
  },[status])
  return (
    <div className="relative h-[calc(100vh-190px)] overflow-y-auto  p-6">
      <ul className="space-y-3  ">
        {/* <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
        <li>Five</li>
        <li>Six</li>
        <li>Seven</li>
        <li>Eight</li>
        <li>Nine</li>
        <li>Ten</li> */}
        {statnow && Object.entries(statnow).map(([key, _] : any) => {
          return <li key={key}>{key}</li>
        })}
      </ul>
    </div>
  )
}

export default ProgressStatusBar
