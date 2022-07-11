import { Button } from "@material-tailwind/react";
import { FiMail } from 'react-icons/fi'
import { FcLike } from 'react-icons/fc'
import { FaGraduationCap } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import Link from 'next/link'


function UserId() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col w-[20rem] h-[30rem] p-3 bg-slate-50 rounded-md border-[1px] border-black '> 
        <div className='flex justify-center w-full h-[20%] mt-5'>
          <img className=' rounded-[50%]' src='/user.png'/>
        </div>
        <div className="mt-5">
          <h1 className="text-[1.25rem] font-bold font-sans mb-2">Aqeel sayadat</h1>
          <div className="flex mt-1">
            <FiMail className = 'w-6 h-6 mr-2'/>
            <h1 className="text-[1.rem]  font-sans">admin@gmail.com</h1>
          </div>
          <div className="flex mt-1 ">
            <FcLike className = 'w-6 h-6 mr-2'/>
            <h1 className="text-[1.rem] font-sans">5</h1>
          </div>
          <div className="flex mt-2">
            <FaGraduationCap className = 'w-6 h-6 mr-2'/>
            <h1 className="text-[1.rem] font-sans">Jadavput university</h1>
          </div>
          <div className="flex mt-2">
            <SiLeetcode className = 'w-6 h-6 mr-2'/>
            <Link href='https://leetcode.com/aqeel007'><a><h1 className="text-[1.rem] font-sans underline">aqeel007</h1></a></Link>
          </div>
        </div>
        <div className='flex justify-end h-[10%] w-full mt-auto'>
          <Button variant="outlined" className="bg-black text-white">Update</Button>
        </div>
      </div>
      
    </div>
  )
}


export default UserId