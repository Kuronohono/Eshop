import React from 'react'

const Login = () => {
  return (
    <div className="flex w-fill items-center justify-center">
        {/* Login Form */}
        <div className="flex flex-col items-center justify-center gap-3 border px-10 py-10">
            <h1 className="font-integralcf">Login</h1>

            <p>Username</p>
            <input type='text' className="authen_input"/>


        </div>
    </div>
  )
}

export default Login
