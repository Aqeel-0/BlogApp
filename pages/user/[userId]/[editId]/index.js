import { Button } from "@material-tailwind/react";
import { FiMail } from 'react-icons/fi'
import { FcLike } from 'react-icons/fc'
import { FaGraduationCap } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from "react";

function UserId() {
    const [pswstatus, setPswstatus] = useState(false)
    const router = useRouter()
    console.log(router.query)
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col w-[20rem] h-[30rem] p-3 bg-slate-50 rounded-md border-[1px] border-black '> 
        <div className='flex justify-center w-full h-[20%] mt-5'>
          <img className=' rounded-[50%]' src='/user.png'/>
        </div>
        <div className="w-full mt-5">
          <input className="w-full text-[1.25rem] font-bold font-sans mb-2 outline-none bg-transparent  focus:outline-none border-blue-200" type='text' placeholder="User name"/>
          <input className="w-full text-[1.25rem] font-bold font-sans mb-2 outline-none bg-transparent focus:outline-none border-blue-200" type='text' placeholder="profile pic"/>
          { pswstatus && 
            <div>
            
            <input className="w-full text-[1.25rem] font-bold font-sans mb-2 outline-none bg-transparent focus:outline-none border-blue-200" type='text' placeholder="old password"/>
            <input className="w-full text-[1.25rem] font-bold font-sans mb-2 outline-none bg-transparent focus:outline-none border-blue-200" type='text' placeholder="new password"/>
            <input className="w-full text-[1.25rem] font-bold font-sans mb-2 outline-none bg-transparent focus:outline-none border-blue-200" type='text' placeholder="confirm password"/>
            </div>
          }
          
        </div>
        <div className="flex mt-auto">
          <div className='h-[10%] w-[45px] md:w-full'>
            <Button onClick = {() => setPswstatus(prev => !prev)} variant="outlined text-sm" className="bg-black text-white">change password</Button>
          </div>
          <div className=' h-[10%] w-auto'>
            <Button variant="outlined" className="bg-black text-white">submit</Button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default UserId