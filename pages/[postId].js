import axios from 'axios'
import Header from '../components/Header'
import { IoIosAddCircle, IoMdTrash } from 'react-icons/io'
import { useEffect, useState, useMemo } from 'react'
import Cookies from "universal-cookie"
import styled from 'styled-components'
import jsonwebtoken from "jsonwebtoken"



export default function Post({data}) {

  
  const [input, setInput] = useState('')
  const [comments, setComments] = useState(data.comment)
  const [err, setErr] = useState("")
  const [commentArr, setCommentArr] = useState([])
  //const cookie = new Cookies()
  const token = new Cookies().get("jwt")
  let verified = {}
  if(token) {
    verified  = {...jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_WEB_TOKEN)};
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const result = await axios({
        method: 'patch',
        url:`${process.env.NEXT_PUBLIC_API}/post/${data._id}`,
        headers: { "auto-token": token || "" },
        data: {
          comment: input
        }
      })
      setComments(result.data.comment)
      //setComments(prevComment => prevComment.reverse())
    } catch (error) {
        setErr(error.response.data.err)
        console.log(error)
    }
    setTimeout(()=>{
      setErr('')
    },700)
    setInput('')
  }

  const deleteComment = async (e)=>{
    const commentId = e.target.parentNode.id
    const postId = data._id

    try {
      const result = await axios({
        method:'delete',
        url:`${process.env.NEXT_PUBLIC_API}/post/${postId}/${commentId}`
      })
      setComments(result.data.comment)
    } catch (error) {
      console.log(error)
    }
  }
  
 
  function filterComment(){
    const temp = comments.map(comm => (
        <div key={comm.id}>
            <div className='w-[100%]'>
              <div className='w-full p-2 flex'>
                <img className = 'w-14 rounded-[50%] object-fit mr-2' src='./user.png'/>
                <h1 className='text-lg font-extrabold self-center ml-1 text-white md:ml-0'>{comm.user.name}</h1>
              </div>
              <div id = {comm.id} className='w-full p-2 flex justify-between items-center'>
                <h2 className=' basis-[90%] comment text-[#cdcdcd] md:self-center'>{comm.comment}</h2>
                {verified._id === comm.user.id && <IoMdTrash id = {comm.id} onClick = {deleteComment} className='icon w-6 h-6 text-white ml-auto'/>}
              </div>
            </div>
            <div className='w-full h-[0.2px] bg-white mb-3'></div>
        </div>
      )
    )
    setCommentArr(temp)

  }
  useEffect(() => filterComment(), [comments])
  
  return (
    <div>
     
      <Header/>
    
      <div className="mt-6 mx-auto w-3/4 flex flex-col">
        <div className='w-full md:w-3/4 mx-auto h-40 '>
          <img className='w-full md:w-[80%] mx-auto h-full object-cover md:object-fill' src={data.image} />
        </div>
        <div className= 'sm:w-3/4 sm:mx-auto'>
          <h1 className= 'text-3xl text-[#cdcdcd]'>{data.title}</h1>
          <div className= 'w-full h-[1px] bg-zinc-300 mt-2 mb-5'></div>
          <div className='text-[#cdcdcd]'>
            {data.body}
          </div>
        </div>
        <div className='w-full h-[1px] bg-slate-100 mt-10 mb-5'></div>
      </div>
      <div className='mx-auto w-3/4 mb-48'>
        <h1 className= 'text-white text-lg text-center mb-4'>Comment section</h1>
        <h1 className='text-red-600 text-lg text-center mb-4'>{err}</h1>
        <form method='post' onSubmit = {handleSubmit} className='flex justify-center w-full'>
          <input onChange = {e => setInput(e.target.value)} className='w-full md:w-[40%] outline-none px-3 py-1 md:py-2 border-[1px ' placeholder='add comment...' value={input} required/>
          <button type = 'submit' className='flex justify-center items-center bg-gray-700'>
            <IoIosAddCircle className='text-white w-10 h-5'/>
          </button>
        </form>

        <div className='flex flex-column justify-start mt-4 w-full'>
          <ul className='w-full content-center'>
            {commentArr}
          </ul>
        </div>
      </div>
    </div>
  )
}

const Wrapper = styled.div`
  width: 80%;
  display: grid;
  grid-auto-rows: minmax(10px, auto);
  margin-bottom: 4px;
  .div{
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .user{
    grid-column: 2/4;
  }
  .comment{
    grid-column-start: 1;
    grid-column-end:3;
    grid-auto-rows: minmax(5px, auto);
    
  }
  .icon{
    grid-column-start: 4;
  }
  
`



// export async function getStaticPaths (){
//   const {data} = await axios({
//     method: 'get',
//     url: 'http://localhost:5000',
//   })

//   const prePage = data.map(item => (
//     { params: {postId: item._id}}
//   ))
//   return {
//     paths: prePage,
//     fallback: false,
//   }
// }

// export async function getStaticProps({params}){
  
//   const {postId} = params
//   const result = await axios({
//     method:'get',
//     url:'http://localhost:5000/post',
//     data: { id: postId}
  
//   })
//   return{
//     props:{
//       data: result.data
//     }
//   }   
// }


export async function getServerSideProps({req, res, params}){
  
    const {postId} = params
    const result = await axios({
      method:'get',
      url:`${process.env.NEXT_PUBLIC_API_FETCH}/post`,
      data: { id: postId}
    
    })
    return{
      props:{
        data: result.data
      }
    }   
}

