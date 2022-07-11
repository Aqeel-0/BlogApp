import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Header from "../components/Header";
function Login() {
    const [emailInput, setEmailinput] = useState("");
    const [passwordInput, setPasswordinput] = useState("");

    const [err, setErr] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();

        const login = { email: emailInput.trim(), password: passwordInput };
        
        axios
            .post(`${process.env.NEXT_PUBLIC_API}/user/login`, login, {
                withCredentials: true,
                credentials: "include",
            })
            .then((result) => {
                setErr(result.data.message);
                if(result.data.user === 'Admin'){
                    setTimeout(() => {
                        Router.push('/admin/dashboard')
                    }, 500);
                }
                else{
                    setTimeout(() => {
                        Router.push('/')
                    }, 500);
                }
            })
            .catch((err) => {
                console.log(err)
                setErr(err.response.data.reason);
            });
    };

    return (
        
        <div className="max-w-5xl mx-auto">
            <Header />
            <div className="flex justify-center items-center h-screen">
                <div className="p-3 rounded-md border-none bg-slate-800 sm:p-10">
                    <form onSubmit={loginHandler} method="post">
                        <h3 className="text-lg text-center text-red-700">
                            {err !== "" ? err : ""}
                        </h3>
                        <p className="mb-4 text-white">
                            Please login to your account
                        </p>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                onChange={(e) => {
                                    setEmailinput(e.target.value);
                                }}
                                name="email"
                                value={emailInput}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordinput(e.target.value);
                                }}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                            <button
                                className="inline-block px-6 py-2.5 bg-slate-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                type="submit"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Log in
                            </button>
                            <a className="text-gray-500" href="#!">
                                Forgot password?
                            </a>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2 text-white">
                                Don't have an account?
                            </p>
                            <Link href="/registration">
                                <button
                                    type="button"
                                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default Login;
