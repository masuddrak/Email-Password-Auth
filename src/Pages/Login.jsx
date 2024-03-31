import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/friebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState("")
    const refEmail = useRef()
    const handelSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)
        // reset success and errro message
        setErrorMessage("")
        setSuccess("")
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if(result.user.emailVerified){
                    setSuccess("success Sign in")
                }else{
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        alert("please varifid email")
                      }).catch((error) => {
                        // An error happened.
                      });
                }
              
            })
            .catch(error => {
                console.log(error.message)
                setErrorMessage(error.message)
            })

        // forget password

    }
    const handelForgetPassword = () => {
        const forgetEmail = refEmail.current.value
        const verificationEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

        if (verificationEmail.test(forgetEmail)) {
            sendPasswordResetEmail(auth, forgetEmail)
            .then(()=>{
                // hello
            })
            .catch(error=>{
                console.log(error.message)
            })
        }
        else if(!verificationEmail.test(forgetEmail)){
            setErrorMessage("please provide a valid email")
        }
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
                                <input ref={refEmail} type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div>
                                {
                                    success && <p>{success}</p>

                                }
                                {
                                    errorMessage && <p>{errorMessage}</p>
                                }
                            </div>
                            <div onClick={handelForgetPassword}>
                                <h2 className="text-green-900 cursor-pointer">Forget Password</h2>
                            </div>
                            <div>
                                <p>You Have New My website <Link to="/register" className="text-green-700">Register Now</Link> </p>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;