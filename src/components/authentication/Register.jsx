import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {app} from '../../firebase/firebase.config'
import { useLocation } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation()
  const {signInWithGooglePopup} = useContext(AuthContext)
  const [error, setError] = useState("");

  const handleRegister = e => {
    e.preventDefault();
    // const name = e.target.name.value;
    // const email = e.target.email.value;
    // const photoURL = e.target.photoURL.value;
    // const password = e.target.password.value;

    const form = e.target 
    const formData = new FormData(form)
    const {email, password, photoURL, ...restFormData} = Object.fromEntries(formData.entries())

    // ✅ Password validation
    if (!/[A-Z]/.test(password)) {
      setError("Password এ অন্তত ১টি Uppercase letter থাকতে হবে!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password এ অন্তত ১টি Lowercase letter থাকতে হবে!");
      return;
    }
    if (password.length < 6) {
      setError("Password কমপক্ষে ৬ character হতে হবে!");
      return;
    }

    // ✅ Firebase signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {

        const userProfile ={
          email,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,

        }

        

        // save profile info in the DB
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(userProfile)
        })
          .then(res => res.json())
          .then(data => {
            if(data.insertedId){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account is created",
                showCancelButton: false, 
                timer: 1500
                
              })
            }
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            })
          })

        // ✅ Update profile (name + photo)
        updateProfile(result.user, {
          displayName: restFormData.name,
          photoURL: photoURL
        }).then(() => {
          toast.success("✅ Registration Successful!");
          navigate("/");   // redirect to home
        });
      })
      .catch(err => {
        setError(err.message);
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
        <h1 className="text-3xl font-bold text-center">Register Now</h1>
        <form onSubmit={handleRegister}>
          <div className="form-control">
            <label className="label">Name</label>
            <input type="text" name="name" placeholder="Your Name" className="input input-bordered"  />
          </div>

          <div className="form-control">
            <label className="label">Email</label>
            <input type="email" name="email" placeholder="email" className="input input-bordered"  />
          </div>

          <div className="form-control">
            <label className="label">Photo URL</label>
            <input type="text" name="photoURL" placeholder="Photo URL" 
             className="input input-bordered"  />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input type="password" name="password" placeholder="password" className="input input-bordered"  />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Google */}
          

          <div className="form-control mt-4 flex content-center items-center justify-around">
            <button className="btn btn-primary">Register</button>
            <button onClick={handleGooglePopUp} className="btn mt-2 bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="underline text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
