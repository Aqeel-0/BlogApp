
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import jsonwebtoken from "jsonwebtoken";
import { Router } from "next/router";

function Post({blogItem}) {

  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const [likes, setLikes] = useState(blogItem.likes_count);
  const [hasliked, setHasliked] = useState(false);
  //const [status, setStaus] = useState('')
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (token) {
      const verified = jsonwebtoken.verify(token, process.env.NEXT_PUBLIC_WEB_TOKEN); // convert this to env later
      if (blogItem.likes && verified._id in blogItem.likes) {
        setHasliked(true) 
      }
    }
    else setHasliked(false)
  }, [token]);

  const handleLike = async (e) => {
    const id = e.target.parentNode.id;
    try {
      const result = await axios({
        method: "patch",
        url: `http://localhost:5000/${id}`,
        headers: { "auto-token": cookies.get("jwt") || "" },
      });
      if (result.data.message === "liked") {
        setLikes((prevLikes) => prevLikes + 1);
        setHasliked(true);
        //setStaus('post liked')
      } else {
        setLikes((prevLikes) => prevLikes - 1);
        setHasliked(false);
        //setStaus('post disliked')
      }
    } catch (error) {
      //setStaus(error.response.data.err)
      setShow(true)
      console.log(error)
    }
    // setTimeout(()=>{
    //   setStaus('')
    // }, 700)
  };

  


  return (
    <div
      key={blogItem._id}
      className="shadow-2xl mt-6 mb-6 mx-auto w-4/5 h-[25rem] rounded-sm relative bg-gray-800 sm:h-auto"
    > 
      {/* Modal */}
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
                  <h3 className="text-2xl font-semibold">
                    Not logged IN
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-5 py-2 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    you need to login to like a post
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                  <Link href='/login'>
                    <a className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button">
                    Log in
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* Body */}
      {/* {status && <h1 className="text-lg text-red-700 absolute top-[-25px] left-[38%]">{status}</h1>} */}
      <div className="flex mb-10 w-full m-auto mt-2 py-4 pb-8 px-4 flex-col items-start h-full sm:flex-row sm:h-[20rem]">
        <div className="relative h-[224px] basis-2/4 grow-0 sm:h-full w-full ">
          <img
            className="w-full h-full object-fit sm:h-full"
            src={blogItem.image}
          />
        </div>
        <div className="basis-2/4 h-full grow-0 w-full overflow-hidden sm:ml-4 text-[#cdcdcd]">
          <p className="text-left text-3xl">{blogItem.title}</p>
          <p className="mt-2 text-sm ">{blogItem.body}</p>
        </div>
      </div>
      <div
        id={blogItem._id}
        className="flex items-center absolute bottom-[6px] left-[20px]"
      >
        {hasliked ? (
          <svg
            id={blogItem._id}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="red"
          >
            <path
              onClick={handleLike}
              fillRule="fill"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <HeartIcon
            onClick={handleLike}
            className="w-full h-5 text-red-700 cursor-pointer"
          />
        )}

        <h2 className="ml-2 text-[#cdcdcd]">{likes}</h2>
      </div>
      <div className="absolute bottom-[2px] right-[4px]">
        <Link href={`/${blogItem._id}`}>
          <a className="text-white">continue reading...</a>
        </Link>
      </div>
    </div>
  );
}

export default Post;
