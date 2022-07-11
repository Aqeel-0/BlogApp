import axios from "axios";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Header from '../components/Header'

function Registration() {
    const [err, setErr] = useState("");
    const [nameInput, setNameinput] = useState("");
    const [emailInput, setEmailinput] = useState("");
    const [passwordInput, setPasswordinput] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const newuser = {
            name: nameInput,
            email: emailInput,
            password: passwordInput,
        };
        try {
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/user/registration`,
                newuser
            );
            setEmailinput("");
            setNameinput("");
            setPasswordinput("");
            Router.push("/login");
        } catch (error) {
            setErr(error.response.data.reason);
            setEmailinput("");
            setNameinput("");
            setPasswordinput("");
        }
    };

    return (
      <div className="max-w-5xl mx-auto h-screen">
            <Header />
            <div className="flex justify-center items-center h-full">
                <div className="p-3 text-left bg-slate-800 rounded-sm sm:p-10">
                    <h3 className="text- text-center text-red-700">
                        {err !== "" ? err : ""}
                    </h3>
                    <h3 className="text-2xl font-bold text-center">Join us</h3>
                    <form onSubmit={submitHandler} method="post">
                        <div className="mt-4">
                            <div>
                                <input
                                    onChange={(e) => {
                                        setNameinput(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Name"
                                    value={nameInput}
                                    required
                                    className="w-full px-3 py-1.5 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setEmailinput(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Email"
                                    value={emailInput}
                                    required
                                    className="w-full px-3 py-1.5 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setPasswordinput(e.target.value);
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    value={passwordInput}
                                    required
                                    className="w-full px-3 py-1.5 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                            </div>
                            <div className="flex">
                                <button
                                    className="inline-block px-6 mt-3 py-2.5 bg-slate-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                    type="submit"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Create account
                                </button>
                            </div>
                            <div className="mt-6 text-grey-dark">
                                Already have an account?
                                <Link href="/login">
                                    <a className="text-blue-600 hover:underline ml-2">
                                        Log in
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;
