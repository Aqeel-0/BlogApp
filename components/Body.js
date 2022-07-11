
import Post from "./Post";
import { useMemo, useState } from 'react'
import {SearchIcon} from '@heroicons/react/outline'


export default function Body({ content }) {

  const [searchQuery, setSearchQuery] = useState('')

  const filerArr = useMemo(()=>
      content.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      [searchQuery]
  )
      
  return (
    <div className="">
        <div className='relative mx-auto w-4/5 sm:flex sm:w-full justify-center mt-3'>
              <div className=' absolute top-[6px] sm:top-[6px] sm:right-[66%]'>
                  <SearchIcon className = 'h-5 w-10 text-gray-500 cursor-pointer' />
              </div> 
              <input onChange = {e => setSearchQuery(e.target.value)} className='pl-10 w-full sm:w-[40%] h-[2rem] rounded-md bg-gray-300 text-base sm:h-full' type='text' placeholder='search' value={searchQuery}/>
        </div> 
        <div>
          {filerArr.map(post =>{
          return <Post key = {post._id} blogItem={post}/>
          })}
        </div> 
    </div>
  )
}
