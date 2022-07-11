import Header from "../../../components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    AiFillHome,
    AiFillDashboard,
    AiOutlineUser,
    AiOutlineLogout,
} from "react-icons/ai"
import { IoMdTrash } from 'react-icons/io'

import axios from "axios";
import Cookies from 'universal-cookie'
import { useState } from "react";


export default function User({ userData }) {
    const cookie = new Cookies()
    const router = useRouter();
    const [userList, setUserList] = useState(userData)
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState('')

    const handleLogout = () =>{
        cookie.remove('jwt')
        router.push('/')
    }
    const updatelist = (id) =>(
        userList.filter(item =>{
            if(item._id !== id) return item
        })
    )

    const handleDelete = async (e)=>{
        const id = postId
        try {
            const result = await axios({
                method:'delete',
                url: `${process.env.NEXT_PUBLIC_API}/user/`+id,
                headers: {'auto-token': cookie.get('jwt') || ''}
            })
            setShow(false)
            const updatedArr = updatelist(id);
            setUserList(updatedArr)

        } catch (error) {
            console.log(error)
        }
    }

    const userArr = userList.map((user) => {
        if(user.name === 'Admin'){
            return <tr key = {user.email} className=" border-b hover:bg-gray-800 bg-red-500 dark:hover:bg-gray-600">
                        <th scope="row" className="px-2 py-4 font-medium text-white dark:text-white whitespace-nowrap">
                            {user.name}
                        </th>
                        <td className="px-2 py-4 text-white">{user.email}</td>
                        <td className="px-2 py-4 text-white"></td>
                    </tr>
        }
        return <tr key = {user.email} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {user.name}
                    </th>
                    <td className="px-2 py-4">{user.email}</td>
                    <td id={user._id} className="px-2 py-4 text-white"><IoMdTrash id={user._id} onClick= {(e)=> {setShow(true)
                                                                                                                setPostId(e.target.parentNode.id)}} 
                                                                                                                className="text-black w-5 h-5 cursor-pointer"/></td>
                </tr>
        
    });

    
    return (
        <div className="flex flex-col justify-between md:flex-row-reverse sm:h-screen">
            <div className="flex flex-col w-full h-[90vh] md:h-[100vh] md:basis-[85%] md:border-l-2 md:border-sky-600 ">
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
                                Are you sure you want to delete the user account
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
                <div className="w-full max-w-[90%] mx-auto md:max-w-[50%]">
                    <div className="relative overflow-x-auto overflow-y-auto shadow-md rounded-md">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 md:mx-auto">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        User name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        email
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        options
                                    </th>
                                </tr>   
                            </thead>
                            <tbody>
                                {userArr}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="w-[98%] mx-auto bg-gray-900 md:basis-[15%] md:h-full ">
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
                                <a
                                    className={
                                        router.pathname == "/admin/dashboard"
                                            ? "flex py-1 md:py-3 pl-1 align-middle no-underline border-b-2 " +
                                              "border-pink-600"
                                            : "flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 hover:border-pink-500"
                                    }
                                >
                                    <AiFillDashboard className="w-5 h-5 text-white mr-3" />
                                    <span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">
                                        Dashboard
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li className="mr-3 flex-1">
                            <Link href="/admin/dashboard/user">
                                <a
                                    className={
                                        router.pathname ==
                                        "/admin/dashboard/user"
                                            ? "flex py-1 md:py-3 pl-1 align-middle no-underline border-b-2 " +
                                              "border-pink-600"
                                            : "flex py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 hover:border-pink-500"
                                    }
                                >
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/user`);
    return {
        props: {
            userData: response.data,
        },
    };
}
