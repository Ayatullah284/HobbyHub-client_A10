import React, {useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/AuthContext";

const Login = () => {
    // 
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {signInWithGooglePopup} = useContext(AuthContext)
  const [error, setError] = useState("");

  // 🔁 যদি private route থেকে redirect হয়, সঠিক path এ পাঠাবে
  const from = location.state?.from?.pathname || "/";

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("✅ Login Successful!");
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError("❌ Wrong email or password", err);
      });
  };

    const handleGooglePopUp = () => {
    signInWithGooglePopup()
      .then(res => {
        console.log(res)
        navigate(location.state ? location.state : "/")
      })
      .catch(err => console.log(err))



  }

  return (
    <div className="card bg-base-100 max-w-sm mx-auto shrink-0 shadow-2xl my-10">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          

          <div className="form-control mt-4 flex content-center items-center justify-around">
            <button className="btn btn-primary">Login</button>
             <button onClick={handleGooglePopUp} className="btn mt-2 bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
          </div>
        </form>

        <p className="text-center mt-3">
          New Here? <Link to="/register" className="underline text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
