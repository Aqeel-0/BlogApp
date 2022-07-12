import Header from "../../../components/Header";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
    TrashIcon,
    PencilIcon,
    ArrowRightIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { AiFillHome, AiFillDashboard, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'
import { SearchIcon } from '@heroicons/react/outline'

function Index(props) {

    const router = useRouter()
    const cookie = new Cookies();
    const [err, setErr] = useState("");
    const [searchQuery, setSearchQuery] = useState('')
    const [posts, setPost] = useState(props.posts);
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState('')
    let totalLikes = 0;
    let totalComments = 0;

    
    const handleLogout = () =>{
        cookie.remove('jwt')
        router.push('/')
    }

    const deleteArr = (id) => {
        let newarr = posts.filter((item) => {
            if (item._id !== id) return item;
        });
        return newarr;
    };

    const filterArr = useMemo(()=>
        posts.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [searchQuery, posts]
    )

    const handleDelete = async (e) => {
        const id = postId
        const options = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API}`,
            headers: { "auto-token": cookie.get("jwt") || "" },
        });
        setShow(false)
        const originalArr = posts;
        const updated_arr = deleteArr(id);
        setPost(updated_arr);
        
        
        try {
            const result = await options.delete(`${postId}`);
            setErr("post deleted");
        } catch (error) {
            setPost(originalArr);
            console.log(error);
            setErr(error.response.data.err);
        }
        setTimeout(() => {
            setErr("");
        }, 1000);
    };

    const arr = filterArr.map((post) => {
        totalLikes += post.likes_count;
        totalComments += post.comment.length
        return (
            <div
                key={post._id}
                id={post._id}
                className="flex items-center h-12 rounded-sm border-b border-white bg-gray-900 pl-3 mb-2 overflow-hidden"
            >
                <h1 className="text-white text-lg ">{post.title}</h1>
                <div id={post._id} className=" flex ml-auto p-4">
                    <Link href={`/${post._id}`}>
                        <a>
                            <ArrowRightIcon className="w-5 h-5 mr-2 text-white cursor-pointer"></ArrowRightIcon>
                        </a>
                    </Link>
                    <Link href={`/admin/dashboard/editpost/${post._id}`}>
                        <a>
                            <PencilIcon className="w-5 h-5 mr-2 text-white cursor-pointer"></PencilIcon>
                        </a>
                    </Link>
                    <TrashIcon
                        onClick={(e) => {setShow(true)
                                        setPostId(e.target.parentNode.id)}}
                        className="w-full h-5 text-white cursor-pointer"
                    />
                </div>
            </div>
        );
    });

    return (
        <div className="flex flex-col justify-between md:flex-row-reverse sm:h-screen">
            <div className="w-full md:basis-[85%] md:border-l-2 md:border-sky-600 ">

                <div className="h-[10%]">
                    <Header />
                </div>

                {show ? (
                    <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold text-red-600">
                                !!!!
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShow(false)}
                            >
                                <h1 className="bg-transparent text-red opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    x
                                </h1>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative px-5 py-2 flex-auto">
                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                Are you sure you want to delete the post
                            </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </button>
                            <button onClick = {handleDelete} className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Delete
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}

                <div className='relative mx-auto w-4/5 sm:flex sm:w-full justify-center mt-3'>
                    <div className='absolute top-[6px] sm:top-[6px] sm:right-[67%] '>
                        <SearchIcon className = 'h-5 w-10 text-gray-500 cursor-pointer' />
                    </div> 
                    <input onChange = {e => setSearchQuery(e.target.value)} className='pl-10 w-full sm:w-[40%] h-[2rem] rounded-md bg-gray-300 text-base sm:h-full' type='text' placeholder='search' value={searchQuery}/>
                </div> 
                <div className="flex flex-col justify-around sm:flex-row">
                    <div className="w-full h-full flex flex-wrap justify-around mt-10 basis-[60%]">
                        <div className="basis-[46%] h-[8rem] bg-gray-50 mb-8 rounded-md p-2">
                            <h2>Total posts: {posts.length}</h2>
                            <h2>Total viewer: 10k</h2>
                            <h2>Total users: 6</h2>
                            <h2>Monthy reach: 3k</h2>
                        </div>
                        <div className="basis-[46%] h-[8rem] bg-gray-50  mb-8 rounded-md p-2 ">
                            <h2>Total likes: {totalLikes}</h2>
                            <h2>Total comments: {totalComments}</h2>
                            <h2>Total shares: 5k</h2>
                            <h2>Total review: 5k</h2>
                        </div>
                        {/* <div className="basis-[46%] h-[8rem] bg-sky-900 mb-8 rounded-md p-2 "></div>
                        <div className="basis-[46%] h-[8rem] bg-sky-900 mb-8 rounded-md p-2 "></div> */}
                    </div>
                    <div className="w-auto  mx-2 sm:basis-[35%] h-[26rem] mt-10 overflow-y-auto overflow-x-hidden">
                        <div className="flex justify-between transition-all">
                            <h1 className="text-white text-xl mb-2">
                                All posts
                            </h1>
                            <div className="text-red-800 text-lg">
                                {err && <h1>{err}</h1>}
                            </div>
                        </div>
                        {arr}
                    </div>
                </div>
            </div>
            <div className="h-14 w-full bg-gray-900 md:basis-[15%] md:h-full">
                <div className="md:relative mx-auto lg:float-right lg:px-6">
                    <ul className="list-reset flex flex-row md:flex-col text-center md:text-left mt-10">
                        <li className="mr-3 flex-1">
                            <Link href="/">
                                <a className="flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                                    <AiFillHome className="w-5 h-5 text-white mr-3" />
                                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                                        Home
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3 flex-1">
                            <Link href="/admin/dashboard">
                                <a className={router.pathname == '/admin/dashboard' ? "flex py-1 md:py-3 pl-1 align-middle no-underline border-b-2 "+'border-pink-600' : "flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 hover:border-pink-500"}>
                                    <AiFillDashboard className="w-5 h-5 text-white mr-3" />
                                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                                        Dashboard
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3 flex-1">
                            <Link href="/admin/dashboard/user">
                            <a className={router.pathname == '/admin/dashboard/user' ? "flex py-1 md:py-3 pl-1 align-middle no-underline border-b-2 "+'border-pink-600' : "flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 hover:border-pink-500"}>
                                <AiOutlineUser className="w-5 h-5 text-white mr-3" />    
                                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                                    Users
                                </span>
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3 flex-1">
                            <a onClick={handleLogout} className="flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline cursor-pointer hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                                <AiOutlineLogout  className="w-5 h-5 text-white mr-3" />
                                <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                                    LogOut
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_FETCH}`);
    return {
        props: {
            posts: response.data,
        },
        revalidate: 10,
    };
}

export default Index;
