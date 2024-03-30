
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase/friebase.config";
import { useState } from "react";



const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success,setSuccess]=useState("")
    const auth = getAuth(app);
    const handelSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // clint site password validatin
        if(password.length<6){
            setErrorMessage("please 6 loger password type now")
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
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
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