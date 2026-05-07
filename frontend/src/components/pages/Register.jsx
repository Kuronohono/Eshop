import React from 'react'
import {Link} from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
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
                  <input type="text" placeholder="Enter your username"
                    className="input_field pl-2"/>
                </div>

                <div className="input_outerDiv w-full">
                  <input type="email" placeholder="Enter your email address"
                    className="input_field pl-2"/>
                </div>

                <div className="input_outerDiv w-full">
                  <input type="password" placeholder="Enter your password"
                    className="input_field pl-2"/>
                </div>

                <div className="input_outerDiv w-full">
                  <input type="password" placeholder="Confirm password"
                    className="input_field pl-2"/>
                </div>

                <p className="auth_paragraph text-red-500 w-full">Invalid Credentials. Please try again</p>

                <button className="auth_button w-full">
                  Sign up
                </button>

                
                <div className="flex flex-col items-center justify-center gap-2 w-full">

                    <div className="flex flex-col gap-3 items-center justify-center w-full">
                      <p className="auth_paragraph">Or sign in with</p>
                      <button className="login_option_btn">
                        <FcGoogle size={24}/>
                        <h2>Google</h2>
                      </button>
                      <button className="login_option_btn">
                        <FaFacebook  size={24}/>
                        <h2>Facebook</h2>
                      </button>
                    </div>

                    <p className="auth_paragraph">Already have an account?</p>
                    <Link to={"/login"} className="auth_paragraph text-blue-400">Sign in</Link>
                </div>
                
            </div>


        </div>
    </div>
  )
}

export default Register
