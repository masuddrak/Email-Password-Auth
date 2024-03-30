
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase/friebase.config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";



const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    console.log(seePassword)
    const auth = getAuth(app);
    const myCheckPassword = /^(?=.*[A-Z])(?=.*[@$!%*?&])[a-zA-Z@$!%*?&]/

    const handelSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // clint site password validatin
        if (password.length < 6) {
            setErrorMessage("please 6 loger password type now")
            return
        }
        else if (!myCheckPassword.test(password)) {
            setErrorMessage("plase type 1 UperCase")
            return
        }

        // set rest erro
        setErrorMessage("")
        setSuccess("")
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess("You Have Logdin")
            })
            .catch(error => {
                setErrorMessage(error.message)
            })

    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handelSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className=" relative">
                                    <input name="password" type={seePassword ? "text" : "password"} placeholder="password" className="input input-bordered w-full" required />
                                    <div className="absolute right-2 top-2 ">
                                        {
                                            seePassword ? <h1 onClick={() => setSeePassword(!seePassword)}><FaEye></FaEye></h1> : <h1 onClick={() => setSeePassword(!seePassword)}><IoMdEyeOff></IoMdEyeOff></h1>
                                        }
                                    </div>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="bg-green-500 text-white p-3" type="submit" value="Register"></input>
                            </div>
                            {
                                errorMessage && <p className="text-red-500">{errorMessage}</p>
                            }
                            {
                                success && <p className="text-green-500">{success}</p>
                            }
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;