import React, { useState } from 'react'
import {Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {

  const navigate = useNavigate();

    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if(!form.username.trim()){
      newErrors.username = "Username field is required.";
    }

    if(!form.email.trim()){
      newErrors.email = "Email is required";
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
      newErrors.email = "Please enter a valid email address.";
    }

    if(!form.password){
      newErrors.password = "Password is required.";
    }else if(form.password.length < 8){
      newErrors.password = "Password must be at least 8 characters.";
    }

    if(!form.confirmPassword){
      newErrors.confirmPassword = "Please confirm your password.";
    }else if(form.confirmPassword != form.password){
      newErrors.confirmPassword = "Passwords do not match."
    }

    return newErrors;

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm( (prev) => ({ ...prev, [name]: value}));
    // Clear the error if the user types
    setErrors((prev) => ({ ...prev, [name]: ""}))
  }

   const handleSubmit = async () => {

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    try {
      setLoading(true);
      
      const response = await fetch("http://localhost:8085/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          username: form.username
        }),
      });

      const data = await response.json();

      if (!response.ok){
        setErrors({ api: data.message || "Sign-up fialed. Please try again."});
        return;
      }

      console.log("Registered!", data);

      navigate("/verification", {state: {email: form.email}});

    } catch (err) {
      setErrors({ api: "Sign-up failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
   //Outer Form
    <div className="flex w-full items-center justify-center mt-[10%] mb-[20%] sm:mt-[7%] md:mt-[5%] sm:mb-[10%] md:mb-[10%]">

        {/* Login Form */}
        <div className="flex flex-col gap-3 items-center border px-[5%] py-[10%] sm:py-[7%] md:py-[3%] rounded-[20px] border-gray-400 bg-[#fbfbfb]">
           
           <div className="flex flex-col items-center ">
              <h1 className="font-integralcf text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px]">Register</h1>
           </div>

            <div className="flex flex-col w-[300px] items-start gap-2 ">

              <div className="input_outerDiv w-full">
                  <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} value={form.username}
                    className="input_field pl-2"/>
                </div>
              {errors.username && <p className="auth_paragraph text-red-500 text-xs mt-1">{errors.username}</p>}
                

                <div className="input_outerDiv w-full">
                  <input type="email" name="email" placeholder="Enter your email address" onChange={handleChange} value={form.email}
                    className="input_field pl-2"/>
                </div>
                {errors.email && <p className="auth_paragraph text-red-500 text-xs mt-1">{errors.email}</p>}

                <div className="input_outerDiv w-full">
                  <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={form.password}
                    className="input_field pl-2"/>
                </div>
              {errors.password && <p className="auth_paragraph text-red-500 text-xs mt-1">{errors.password}</p>}

                <div className="input_outerDiv w-full">
                  <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} value={form.confirmPassword}
                    className="input_field pl-2"/>
                </div>
               {errors.confirmPassword && <p className="auth_paragraph text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}

                <p className="auth_paragraph text-red-500 w-full"></p>

                <button className="auth_button w-full" disabled={loading} onClick={handleSubmit}>
                   {loading ? "Signing up..." : "Sign up"}
                </button>

                
                <div className="flex flex-col items-center justify-center gap-2 w-full">

                    <div className="flex flex-col gap-3 items-center justify-center w-full">
                      <p className="auth_paragraph">Or sign in with</p>
                      <button className="login_option_btn hover:bg-[#F0F0F0]">
                        <FcGoogle size={24}/>
                        <h2>Google</h2>
                      </button>
                      <button className="login_option_btn bg-blue-700 hover:bg-blue-600 text-white">
                        <FaFacebook  size={24}/>
                        <h2>Facebook</h2>
                      </button>
                    </div>
                    {errors.api && <p className="auth_paragraph text-red-500 w-full">{errors.api}</p>}
                    <p className="auth_paragraph">Already have an account?</p>
                    <Link to={"/login"} className="auth_paragraph text-blue-400">Sign in</Link>
                </div>
                
            </div>


        </div>
    </div>
  )
}

export default Register
