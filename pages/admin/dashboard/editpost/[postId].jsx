import axios from "axios";
import { useState } from "react";
import Header from "../../../../components/Header";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
function Editpost({blog}) {
    
    const [titlestate, setTitlestate] = useState(blog.title)
    const [imagestate, setImagestate] = useState(blog.image)
    const [bodystate, setBodystate] = useState(blog.body)
    const router = useRouter()
    const [err, setErr] = useState("");
    const cookies = new Cookies()

    const handelSubmit = async(e)=>{
        e.preventDefault()
        try {
            const result = await axios({
                method:'patch',
                url:`${process.env.NEXT_PUBLIC_API}/edit/${blog._id}`,
                headers: { "auto-token": cookies.get('jwt') || ''},
                data:{
                    title: titlestate,
                    image: imagestate,
                    body: bodystate,
                }
               
            })
            setErr(result.data.result)
        } catch (error) {
            console.log(error)
            setErr(error.response.data.err)
        }
        setTimeout(()=>{
            setErr('')
            router.push('/admin/dashboard')
        },700)

        
    }
    
    return (
    <>
        <div className="max-w-5xl mx-auto">
            <Header />
            <div className=" h-screen w-9/12 mx-auto">
                <form
                    onSubmit={handelSubmit}
                    method="PATCH"
                    className="flex flex-col mt-20"
                >
                    <div className="flex justify-center mb-5 text-red-600 text-xl">
                        <h3>{err}</h3>
                    </div>

                    <input
                        onChange={(e) => setTitlestate(e.target.value)}
                        className="form-control
                                mb-5
                                block
                                w-full
                                px-3
                                py-1.5
                                text-lg
                                font-bold
                                text-white
                                bg-gray-900
                                
                                rounded
                                transition
                                ease-in-out
                                m-0
                                outline-none
                                focus:text-white focus:border-blue-600"
                        type="text"
                        placeholder="Title..."
                        name="title"
                        value={titlestate}
                    />
                    <input
                        onChange={(e) => setImagestate(e.target.value)}
                        className="px-3 py-1.5 rounded-md text-white mb-16 text-lg font-bold focus:text-white bg-gray-900 focus:border-blue-600 transition ease-in-out"
                        type="text"
                        placeholder="image url..."
                        name="image"
                        value={imagestate}
                    />
                    <textarea
                        onChange={(e) => setBodystate(e.target.value)}
                        className="pl-3 pt-2 pb-2 pr-4 rounded-md border border-solid border-gray-300 text-white bg-gray-900 focus:outline-none focus:text-white text-base mb-3"
                        type="text"
                        rows="9"
                        cols="70"
                        name="body"
                        value={bodystate}
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </>
    );
}

export async function getServerSideProps({params}){
    const {postId} = params
    const result = await axios({
        method:'get',
        url:`${process.env.NEXT_PUBLIC_API}/post`,
        data: {
            id: postId
        }
    })
    return {
        props: {blog : result.data}
    }
}       


export default Editpost