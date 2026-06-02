// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

export default function AdminLogin() {
  const [error, setError]       = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const [form, setForm] = useState({
      email: "",
      password: ""
    });
    
    const hanldeChange = (e) => {
      const {name, value } = e.target;
      setForm((prev) => ({...prev, [name]: value}));
      setError("");
    }

      const handleLogin = async () => {
    setLoading(true);

    try{
      const response = await fetch("http://localhost:8085/auth/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(form),
      });

      if(response.ok){
        const data = await response.json();

        const decoded = jwtDecode(data.token);

        console.log(decoded);

        if (decoded.role !== 'ROLE_ADMIN') {
            setError('Access denied. Admins only.');
            return;  // If the user trying to log in isn't ADMIN deny access
        }
        
        localStorage.setItem("admin_token", data.token); //save token
        navigate("/Dashboard");
      } else{
        setError("Invalid credentials. Please try again.");
      }
    }catch(err){
      console.error(err);
      setError("Something went wrong. Please try again.");
    }finally{
      setLoading(false);
    }
  };


  return (
    //Outer Form
    <div className="flex w-full items-center justify-center mt-[10%] sm:mt-[7%] md:mt-[5%]">
        
        {/* Login Form */}
        <div className="flex flex-col gap-3 items-center border px-[5%] py-[10%] sm:py-[7%] md:py-[3%] rounded-[20px] border-gray-400 bg-[#fbfbfb]">

           <div className="flex flex-col items-center ">
              <h1 className="font-satoshibold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px]">Admin Login</h1>
           </div>

           <div className="flex flex-col w-75 items-start gap-2 "></div>

            <div className="input_outerDiv w-full">
              <input name="email" type="email" placeholder="Enter your email address" onChange={hanldeChange} value={form.email}
                className="input_field pl-2"/>
            </div>

            <div className="input_outerDiv w-full">
              <input name="password" type="password" placeholder="Enter your password"  onChange={hanldeChange} value={form.password}
                className="input_field pl-2"/>
            </div>

            <p className="auth_paragraph text-red-500 w-full">{error}</p>

                <button className="auth_button w-full" onClick={handleLogin}>
                  Login
                </button>
        </div>
       
    </div>
  );
}