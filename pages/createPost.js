import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";
import Cookies from 'universal-cookie';

function CreatePost() {

    const cookies = new Cookies()

    const [titleState, setTitlestate] = useState("");
    const [imageState, setImagestate] = useState("");
    const [bodyState, setBodystate] = useState("");

    const [err, setErr] = useState('');
   
    const titleHandeler = (e) => {
        setTitlestate(e.target.value);
    };
    const imageHandeler = (e) => {
        setImagestate(e.target.value);
    };
    const bodyHandeler = (e) => {
        setBodystate(e.target.value);
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        const newpost = {
            title: titleState,
            image: imageState,
            body: bodyState,
        };
        const authAxios = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API}`,
            headers: { "auto-token": cookies.get('jwt') || ''},
        });
        try {
            const result = await authAxios.post("", newpost);
            setErr("post uploaded");
        } catch (err) {
            setErr(err.response.data.err);
        }
        setTimeout(() => {
            setErr('')
        }, 1000)

        setTitlestate("");
        setImagestate("");
        setBodystate("");
    };

    return (
        <>
        
            <div className="max-w-5xl mx-auto">
                <Header />
                <div className=" h-screen w-9/12 mx-auto relative">
                    <div className="flex justify-center mb-5 text-red-600 text-xl absolute left-[40%] top-[-50px]">
                        {err && <h1>{err}</h1>}
                    </div>
                    <form
                        onSubmit={handelSubmit}
                        method="POST"
                        className="flex flex-col mt-20"
                    >

                        <input
                            onChange={titleHandeler}
                            className="form-control
                                    mb-5
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-lg
                                    font-bold
                                    text-gray-700
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
                            value={titleState}
                        />
                        <input
                            onChange={imageHandeler}
                            className="px-3 py-1.5 rounded-md   bg-gray-900 mb-16 text-lg font-bold focus:text-white focus:border-blue-600 transition ease-in-out"
                            type="text"
                            placeholder="image url..."
                            name="image"
                            value={imageState}
                        />
                        <textarea
                            onChange={bodyHandeler}
                            className="pl-3 pt-2 pb-2 pr-4 rounded-md border border-solid border-gray-300 bg-gray-900 focus:outline-none focus:text-white text-base mb-3"
                            type="text"
                            rows="9"
                            cols="70"
                            name="body"
                            value={bodyState}
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

export default CreatePost;


